import { dismissHandler } from "@react-dive-ui/dismissible-layer";
import { assign, createMachine, fromCallback } from "xstate";
import { createFocusTrap } from "focus-trap";

import { Context, Events } from "./types";
import { dom } from "./dom";

type DismissLogicOptions = {
  getElement: () => HTMLElement | null;
  dismiss: () => void;
  modal: boolean;
  exclude?: Array<(() => HTMLElement | null) | HTMLElement>;
};
const dismissLogic = fromCallback<any, DismissLogicOptions>(({ input }) => {
  const cleanups: Array<() => void> = [];

  const rId = requestAnimationFrame(() => {
    const element = input.getElement();
    if (!element) return;

    const excludeElements = (input.exclude ?? [])
      .map((v) => (typeof v === "function" ? v() : v))
      .filter((v): v is HTMLElement => !!v);

    cleanups.push(() => cancelAnimationFrame(rId));
    cleanups.push(
      dismissHandler({
        layer: {
          element,
          dismiss: input.dismiss,
          modal: input.modal,
        },
        options: {
          exclude: excludeElements,
        },
      })
    );
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
});

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
      escapeDeactivates: false,
    });
    trap.activate();

    cleanups.push(() => trap.deactivate());
  });
  cleanups.push(() => cancelAnimationFrame(rId));

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
});

type InertLogicOption = {
  id: string;
  getElement: () => HTMLElement | undefined | null;
  enabled: boolean;
};
const inertLogic = fromCallback<any, InertLogicOption>(({ input }) => {
  if (!input.enabled) return;

  const cleanups: Array<() => void> = [];
  const rId = requestAnimationFrame(() => {
    const element = input.getElement();
    if (!element) return;

    const treeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: (node) => {
          if (!(node instanceof Element)) {
            return NodeFilter.FILTER_SKIP;
          }
          if (node.tagName === "STYLE" || node.tagName === "SCRIPT") {
            return NodeFilter.FILTER_SKIP;
          }
          if (
            node.id === input.id ||
            node.closest(`#${CSS.escape(input.id)}`)
          ) {
            return NodeFilter.FILTER_SKIP;
          }

          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const elements: Element[] = [];
    while (treeWalker.nextNode()) {
      const currentNode = treeWalker.currentNode as Element;
      if (!currentNode.closest("[inert]")) {
        currentNode.setAttribute("inert", "");
        elements.push(currentNode);
      }
    }
    cleanups.push(() => {
      elements.forEach((el) => el.removeAttribute("inert"));
    });
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
            src: "dismissLogic",
            input: ({ context, self }) => ({
              getElement: () => dom.getPanelEl(context),
              dismiss: () => self.send({ type: "CLOSE" }),
              modal: context.type === "modal",
              exclude: [() => dom.getTriggerEl(context)],
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
          {
            id: "inertLogic",
            src: "inertLogic",
            input: ({ context }) => ({
              id: dom.getPanelId(context),
              getElement: () => dom.getPanelEl(context),
              enabled: context.type === "modal",
            }),
          },
        ],
        on: {
          CLOSE: {
            target: "closed",
            actions: [{ type: "setIsOpen", params: { open: false } }],
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
      },

      actions: {} as { type: "setIsOpen"; params: { open: boolean } },

      actors: {} as
        | {
            src: "dismissLogic";
            logic: typeof dismissLogic;
            input: DismissLogicOptions;
          }
        | {
            src: "scrollLockLogic";
            logic: typeof scrollLockLogic;
          }
        | {
            src: "focusTrapLogic";
            logic: typeof focusTrapLogic;
          }
        | {
            src: "inertLogic";
            logic: typeof inertLogic;
            input: InertLogicOption;
          },
    },
  },
  {
    actions: {
      setIsOpen: assign(({ action }) => ({ open: action.params.open })),
    },
    guards: { isOpen: ({ context }) => context.open },
    actors: {
      dismissLogic: dismissLogic,
      scrollLockLogic: scrollLockLogic,
      focusTrapLogic: focusTrapLogic,
      inertLogic: inertLogic,
    },
  }
);
