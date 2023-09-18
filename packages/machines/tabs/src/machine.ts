import { createMachine } from "xstate";

export const machine = createMachine({
  id: "Tabs",
  context: ({ input }: any) => ({
    id: input.id,
    value: input?.value ?? null,
    focusedValue: null,
    orientation: input?.orientation ?? "horizontal",
    activationMode: input?.activationMode ?? "automatic",
  }),
  initial: "idle",
  states: {
    idle: {},
    focused: {},
  },
  on: {},
  types: {},
});
