import { assign, createMachine } from "xstate";

export const machine = createMachine(
  {
    id: "Dialog",
    initial: "setup",
    context: ({ input }) => ({
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
      events: {} as { type: "OPEN" } | { type: "CLOSE" },
      context: {} as { open: boolean },
      input: {} as { open?: boolean },
      actions: {} as { type: "setIsOpen"; params: { open: boolean } },
    },
  },
  {
    actions: {
      setIsOpen: assign(({ action }) => ({ open: action.params.open })),
    },
    guards: { isOpen: ({ context }) => context.open },
  }
);
