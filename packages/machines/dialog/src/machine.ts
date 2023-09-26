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

const escapeLogic = fromCallback<any, { context: Context }>(({ input }) => {
  const { id } = input.context;
  const escapeHandler = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;

    const target = event.target as HTMLElement;
    const panelEl = dom.getPanelEl(input.context);
    if (!target || !panelEl) return;
    if (!panelEl.contains(target)) return;

    dismissManager.dismiss(id);
  };

  document.addEventListener("keydown", escapeHandler);

  return () => {
    document.removeEventListener("keydown", escapeHandler);
  };
});

const focusTrapLogic = fromCallback<any, { context: Context }>(({ input }) => {
  const context = input.context;

  let trap: FocusTrap | null = null;
  const rId = requestAnimationFrame(() => {
    const el = dom.getPanelEl(context);
    if (!el) return;

    const initialFocusEl = context.initialFocusEl?.();
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

export const machine = createMachine(
  {
    id: "Dialog",
    initial: "setup",
    context: ({ input }) => ({
      id: input.id,
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
            input: ({ context }) => ({ context }),
          },
          {
            src: "focusTrapLogic",
            input: ({ context }) => ({ context }),
          },
          {
            src: "escapeLogic",
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
    },
  }
);
