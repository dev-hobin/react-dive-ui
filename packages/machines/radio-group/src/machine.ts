import { createMachine } from "xstate";

export const machine = createMachine(
  {
    id: "RadioGroup",
    context: {},
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
          "RADIO.SELECT": {},
        },
      },
    },
    types: {
      events: {} as
        | { type: "RADIO.FOCUS" }
        | { type: "RADIO.BLUR" }
        | { type: "RADIO.SELECT" }
        | { type: "RADIO.SELECT.PREV" }
        | { type: "RADIO.SELECT.NEXT" },
    },
  },
  {
    actions: {},
    guards: {},
  }
);
