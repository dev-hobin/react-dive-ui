import { createMachine } from "xstate";

export const machine = createMachine({
  id: "Dialog",
  context: {},
  initial: "setup",
  states: {
    setup: {},
    closed: {},
    open: {},
  },
  types: {},
});
