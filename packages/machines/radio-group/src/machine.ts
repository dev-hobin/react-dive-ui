import { createMachine } from "xstate";

export const machine = createMachine({
  id: "RadioGroup",
  initial: "idle",
  context: {},
  states: {
    idle: {},
  },
});
