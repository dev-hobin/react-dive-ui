import { createMachine } from "xstate";

export const machine = createMachine({
  id: "RadioGroup",
  initial: "idle",
  states: {
    idle: {
      on: {
        "RADIO.FOCUS": {
          target: "focused",
        },
      },
    },
    focused: {
      on: {
        "RADIO.BLUR": {
          target: "idle",
        },
        "RADIO.SELECT.NEXT": {},
        "RADIO.SELECT.PREV": {},
      },
    },
  },
  on: {
    "RADIO.SELECT": {},
    "CONTEXT.SET": {},
  },
  types: {
    events: {} as
      | { type: "RADIO.FOCUS" }
      | { type: "RADIO.BLUR" }
      | { type: "RADIO.SELECT" }
      | { type: "RADIO.SELECT.NEXT" }
      | { type: "RADIO.SELECT.PREV" }
      | { type: "CONTEXT.SET" },
  },
});
