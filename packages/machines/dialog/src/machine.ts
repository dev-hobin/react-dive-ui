import { dismissManager } from "@react-dive-ui/dismissible-layer";
import { assign, createMachine, fromCallback } from "xstate";

import { Context, Events } from "./types";
import { dom } from "./dom";

import { createFocusTrap, type FocusTrap } from "focus-trap";

const outsideInteractionLogic = fromCallback<any, { context: Context }>(
  ({ sendBack, input }) => {
    const { id } = input.context;

    dismissManager.register({
      type: "modal",
      id: id,
      dismiss: () => sendBack({ type: "CLOSE" }),
    });

    const outsideClickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const panelEl = dom.getPanelEl(input.context);
      if (!target || !panelEl) return;
      if (panelEl.contains(target)) return;

      dismissManager.dismiss(id);
    };

    document.addEventListener("click", outsideClickHandler, {
      capture: true,
    });

    return () => {
      document.removeEventListener("click", outsideClickHandler, {
        capture: true,
      });
    };
  }
);

const focusTrapLogic = fromCallback<any, { context: Context }>(({ input }) => {
  const context = input.context;

  let trap: FocusTrap | null = null;
  const rId = requestAnimationFrame(() => {
    const el = dom.getPanelEl(context);
    if (!el) return;

    const initialFocusEl = context.initialFocusEl?.();
    trap = createFocusTrap(el, { initialFocus: initialFocusEl });
    trap.activate();
  });

  return () => {
    cancelAnimationFrame(rId);
    trap?.deactivate();
  };
});

export const machine = createMachine(
  {
    id: "Dialog",
    initial: "setup",
    context: ({ input }) => ({
      id: input.id,
      open: input.open ?? false,
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
            input: ({ context }) => ({
              context,
            }),
          },
          {
            src: "focusTrapLogic",
            input: ({ context }) => ({ context }),
          },
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
        open?: boolean;
        initialFocus?: () => HTMLElement | null;
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
    },
  }
);
