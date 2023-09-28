import { Layer, dismissManager } from "@react-dive-ui/dismissible-layer";
import { assign, createMachine, fromCallback } from "xstate";
import { createFocusTrap } from "focus-trap";

import { Context, Events } from "./types";
import { dom } from "./dom";

type OutsideClickLogicOption = {
  id: string;
  type: "modal" | "non-modal";
  getElement: () => HTMLElement | undefined | null;
  dismiss: () => void;
  exclude: (HTMLElement | (() => HTMLElement | undefined | null))[];
  parentLayerId?: Layer["id"];
  childLayerIds?: Layer["id"][];
};
const outsideClickLogic = fromCallback<any, OutsideClickLogicOption>(
  ({ input }) => {
    console.log("outsideClick", input);
    const cleanups: Array<() => void> = [];
    const rId = requestAnimationFrame(() => {
      const element = input.getElement();
      if (!element) return;

      dismissManager.registerLayer({
        type: input.type,
        id: input.id,
        element: element,
        dismiss: input.dismiss,
        parentId: input.parentLayerId,
        childIds: input.childLayerIds,
      });
      cleanups.push(() => {
        dismissManager.unregister(input.id);
      });

      const dismissHandler = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;
        const excludeEls = input.exclude.map((v) =>
          typeof v === "function" ? v() : v
        );

        if (
          element.contains(target) ||
          dismissManager
            .getNestedLayers(input.id)
            .find((l) => l.element.contains(target))
        ) {
          return;
        }
        if (excludeEls.find((el) => el?.contains(target))) return;

        console.log("execute");
        dismissManager.handleDismiss(input.id);
      };

      document.addEventListener("click", dismissHandler, { capture: true });
      cleanups.push(() => {
        document.removeEventListener("click", dismissHandler, {
          capture: true,
        });
      });
    });
    cleanups.push(() => cancelAnimationFrame(rId));

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }
);

const scrollLockLogic = fromCallback(() => {
  const overflow = getComputedStyle(document.body).overflow;

  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = overflow;
  };
});

type FocusTrapLogicOption = {
  getElement: () => HTMLElement | undefined | null;
  getInitialFocusElement?: () => HTMLElement | undefined | null;
};
const focusTrapLogic = fromCallback<any, FocusTrapLogicOption>(({ input }) => {
  const cleanups: Array<() => void> = [];
  const rId = requestAnimationFrame(() => {
    const element = input.getElement();
    if (!element) return;

    const trap = createFocusTrap(element, {
      fallbackFocus: element,
      initialFocus: input.getInitialFocusElement?.() ?? undefined,
    });
    trap.activate();

    cleanups.push(() => trap.deactivate());
  });
  cleanups.push(() => cancelAnimationFrame(rId));

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
});

export const machine = createMachine(
  {
    id: "Dialog",
    initial: "setup",
    context: ({ input }) => ({
      id: input.id,
      type: input.type,
      open: input.open ?? false,
      initialFocusEl: input.initialFocusEl ?? (() => undefined),
      parentLayerId: input.parentLayerId ?? null,
      childLayerIds: input.childLayerIds ?? null,
    }),
    states: {
      setup: {
        always: [
          {
            guard: "isOpen",
            target: "opened",
          },
          { target: "closed" },
        ],
      },
      opened: {
        invoke: [
          {
            src: "outsideClickLogic",
            input: ({ context, self }) => ({
              id: context.id,
              type: context.type,
              getElement: () => dom.getPanelEl(context),
              dismiss: () => self.send({ type: "CLOSE" }),
              exclude: [() => dom.getTriggerEl(context)],
              parentLayerId: context.parentLayerId ?? undefined,
              childLayerIds: context.childLayerIds ?? [],
            }),
          },
          {
            src: "focusTrapLogic",
            input: ({ context }) => ({
              getElement: () => dom.getPanelEl(context),
              getInitialFocusElement: context.initialFocusEl,
            }),
          },
          { src: "scrollLockLogic" },
        ],
        on: {
          CLOSE: {
            target: "closed",
            actions: [
              { type: "setIsOpen", params: { open: false } },
              "dismissLayer",
            ],
          },
        },
      },
      closed: {
        on: {
          OPEN: {
            target: "opened",
            actions: [{ type: "setIsOpen", params: { open: true } }],
          },
        },
      },
    },
    types: {
      events: {} as Events,
      context: {} as Context,
      input: {} as {
        id: string;
        type: "modal" | "non-modal";
        open?: boolean;
        initialFocusEl?: () => HTMLElement | undefined;
        parentLayerId?: Layer["id"];
        childLayerIds?: Layer["id"][];
      },

      actions: {} as
        | { type: "setIsOpen"; params: { open: boolean } }
        | { type: "dismissLayer" },

      actors: {} as
        | {
            src: "outsideClickLogic";
            logic: typeof outsideClickLogic;
            input: OutsideClickLogicOption;
          }
        | {
            src: "scrollLockLogic";
            logic: typeof scrollLockLogic;
          }
        | {
            src: "focusTrapLogic";
            logic: typeof focusTrapLogic;
          },
    },
  },
  {
    actions: {
      setIsOpen: assign(({ action }) => ({ open: action.params.open })),
      dismissLayer: ({ context }) => {
        dismissManager.unregister(context.id);
      },
    },
    guards: { isOpen: ({ context }) => context.open },
    actors: {
      outsideClickLogic: outsideClickLogic,
      scrollLockLogic: scrollLockLogic,
      focusTrapLogic: focusTrapLogic,
    },
  }
);
