import { createMachine } from "xstate";

export const machine = createMachine({
  id: "Accordion",
  initial: "idle",
  context: ({ input }) => ({}),
  states: {
    idle: {},
    focused: {},
  },
  on: {},
});
