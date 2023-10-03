import { createMachine } from "xstate";
import { Context, Events, Input } from "./types";

export const machine = createMachine({
  id: "Popover",
  initial: "closed",
  context: ({ input }) => ({
    id: input.id,
  }),
  states: {
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
  },
});
