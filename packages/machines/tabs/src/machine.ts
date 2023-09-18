import { createMachine } from "xstate";
import { Context, Input } from "./types";

export const machine = createMachine({
  id: "Tabs",
  context: ({ input }) => ({
    id: input.id,
    focusedValue: null,
    value: input?.value ?? null,
    itemMap: input?.itemMap ?? new Map(),
    orientation: input?.orientation ?? "horizontal",
    activationMode: input?.activationMode ?? "automatic",
  }),
  initial: "idle",
  states: {
    idle: {},
    focused: {},
  },
  on: {},
  types: {
    context: {} as Context,
    input: {} as Input,
  },
});
