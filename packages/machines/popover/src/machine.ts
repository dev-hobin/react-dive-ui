import { createMachine } from "xstate";
import { Context, Events, Input } from "./types";

export const machine = createMachine(
  {
    id: "Popover",
    initial: "setup",
    context: ({ input }) => ({
      id: input.id,
      isOpen: input.isOpen ?? false,
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
          },
          TOGGLE: {
            target: "closed",
          },
        },
      },
      closed: {
        on: {
          OPEN: {
            target: "opened",
          },
          TOGGLE: {
            target: "opened",
          },
        },
      },
    },
    types: {
      events: {} as Events,
      context: {} as Context,
      input: {} as Input,
      guards: {} as { type: "isOpen" },
    },
  },
  {
    guards: {
      isOpen: ({ context }) => context.isOpen,
    },
  }
);
