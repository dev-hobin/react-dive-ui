import { dismissManager, Layer } from "@react-dive-ui/dismissible-layer";
import { assign, createMachine, fromCallback } from "xstate";

import { Context, Events } from "./types";
import { dom } from "./dom";

import { createFocusTrap, type FocusTrap } from "focus-trap";

const outsideInteractionLogic = fromCallback<
  any,
  {
    layer: Layer;
    getTargetEl: () => HTMLElement | null;
  }
>(({ input }) => {
  const { layer, getTargetEl } = input;

  dismissManager.register(layer);

  const outsideClickHandler = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target) return;

    const el = getTargetEl();
    if (!el) return;
    if (el.contains(target)) return;

    dismissManager.dismiss(layer.id);
  };

  document.addEventListener("click", outsideClickHandler, {
    capture: true,
  });

  return () => {
    document.removeEventListener("click", outsideClickHandler, {
      capture: true,
    });
  };
});

const escapeLogic = fromCallback<
  any,
  { layerId: Layer["id"]; getTargetEl: () => HTMLElement | null }
>(({ input }) => {
  const { layerId, getTargetEl } = input;
  const escapeHandler = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;

    const target = event.target as HTMLElement;
    if (!target) return;

    const el = getTargetEl();
    if (!el) return;
    if (!el.contains(target)) return;

    dismissManager.dismiss(layerId);
  };

  document.addEventListener("keydown", escapeHandler);

  return () => {
    document.removeEventListener("keydown", escapeHandler);
  };
});

const focusTrapLogic = fromCallback<
  any,
  {
    getTargetEl: () => HTMLElement | null;
    getInitialFocusEl?: () => HTMLElement | undefined;
  }
>(({ input }) => {
  const { getInitialFocusEl, getTargetEl } = input;

  let trap: FocusTrap | null = null;
  const rId = requestAnimationFrame(() => {
    const el = getTargetEl();
    if (!el) return;

    const initialFocusEl = getInitialFocusEl?.();
    trap = createFocusTrap(el, {
      initialFocus: initialFocusEl,
      escapeDeactivates: false,
    });
    trap.activate();
  });

  return () => {
    cancelAnimationFrame(rId);
    trap?.deactivate();
  };
});

const scrollLockLogic = fromCallback(() => {
  const overflow = getComputedStyle(document.body).overflow;

  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = overflow;
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
            src: "outsideInteractLogic",
            input: ({ context, self }) => ({
              layer: {
                id: context.id,
                type: context.type,
                dismiss: () => self.send({ type: "CLOSE" }),
              },
              getTargetEl: () => dom.getPanelEl(context),
            }),
          },
          {
            src: "focusTrapLogic",
            input: ({ context }) => ({
              getTargetEl: () => dom.getPanelEl(context),
              getInitialFocusEl: context.initialFocusEl,
            }),
          },
          {
            src: "escapeLogic",
            input: ({ context }) => ({
              getTargetEl: () => dom.getPanelEl(context),
              layerId: context.id,
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
      },
      actions: {} as
        | { type: "setIsOpen"; params: { open: boolean } }
        | { type: "dismissLayer" },
      actors: {} as
        | {
            src: "outsideInteractLogic";
            logic: typeof outsideInteractionLogic;
            input: { context: Context };
          }
        | {
            src: "focusTrapLogic";
            logic: typeof focusTrapLogic;
            input: { context: Context };
          }
        | {
            src: "escapeLogic";
            logic: typeof escapeLogic;
            input: { context: Context };
          }
        | {
            src: "scrollLockLogic";
            logic: typeof scrollLockLogic;
            input: { context: Context };
          },
    },
  },
  {
    actions: {
      setIsOpen: assign(({ action }) => ({ open: action.params.open })),
      dismissLayer: ({ context }) => {
        dismissManager.dismiss(context.id);
      },
    },
    guards: { isOpen: ({ context }) => context.open },
    actors: {
      outsideInteractLogic: outsideInteractionLogic,
      focusTrapLogic: focusTrapLogic,
      escapeLogic: escapeLogic,
      scrollLockLogic: scrollLockLogic,
    },
  }
);
