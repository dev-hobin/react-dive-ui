import { createMachine } from "xstate";
import { MachineContext, MachineEvent } from "./types";

export const machine = createMachine({
  id: "Accordion",
  initial: "idle",
  context: ({ input }) => ({
    type: input.type,
    expandedValues: input?.expandedValues ?? [],
    collapsible: input?.collapsible ?? true,
    orientation: input?.orientation ?? "vertical",
    focusedValue: null,
  }),
  states: {
    idle: {
      on: {
        "TRIGGER.FOCUS": {
          target: "focused",
        },
      },
    },
    focused: {
      on: {
        "TRIGGER.BLUR": {
          target: "idle",
        },
        "TRIGGER.FOCUS.NEXT": {},
        "TRIGGER.FOCUS.PREV": {},
        "TRIGGER.FOCUS.FIRST": {},
        "TRIGGER.FOCUS.END": {},
      },
    },
  },
  on: {
    "ITEM.TOGGLE": {},
    "ITEM.EXPAND": {},
    "ITEM.COLLAPSE": {},
  },
  types: {
    context: {} as MachineContext,
    events: {} as MachineEvent,
  },
});
