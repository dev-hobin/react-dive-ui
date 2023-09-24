import { assign, createMachine } from "xstate";
import { Item } from "./types";

export const machine = createMachine(
  {
    id: "RadioGroup",
    context: ({ input }) => ({
      focusedValue: null,
      selectedValue: input.selectedValue ?? null,
      itemMap: input.itemMap ?? new Map(),
    }),
    initial: "idle",
    states: {
      idle: {
        on: {
          "RADIO.FOCUS": {
            target: "focused",
            actions: [
              {
                type: "setFocusedValue",
                params: ({ event }) => ({ value: event.value }),
              },
            ],
          },
        },
      },
      focused: {
        on: {
          "RADIO.BLUR": {
            target: "idle",
            actions: {
              type: "setFocusedValue",
              params: { value: null },
            },
          },
          "RADIO.SELECT.NEXT": {},
          "RADIO.SELECT.PREV": {},
          "RADIO.SELECT": {},
        },
      },
    },
    types: {
      events: {} as
        | { type: "RADIO.FOCUS"; value: Item["value"] }
        | { type: "RADIO.BLUR" }
        | { type: "RADIO.SELECT" }
        | { type: "RADIO.SELECT.PREV" }
        | { type: "RADIO.SELECT.NEXT" },
      context: {} as {
        focusedValue: Item["value"] | null;
        selectedValue: Item["value"] | null;
        itemMap: Map<Item["value"], Item>;
      },
      input: {} as {
        itemMap?: Map<Item["value"], Item>;
        selectedValue?: Item["value"];
      },
      actions: {} as {
        type: "setFocusedValue";
        params: { value: Item["value"] | null };
      },
    },
  },
  {
    actions: {
      setFocusedValue: assign(({ action }) => ({
        focusedValue: action.params.value,
      })),
    },
    guards: {},
  }
);
