import { assign, createMachine } from "xstate";
import { Context, Item } from "./types";

export const machine = createMachine(
  {
    id: "RadioGroup",
    context: ({ input }) => ({
      id: input.id,
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
          "RADIO.SELECT": {
            actions: [
              {
                type: "select",
                params: ({ event }) => ({ value: event.value }),
              },
            ],
          },
        },
      },
    },
    types: {
      events: {} as
        | { type: "RADIO.FOCUS"; value: Item["value"] }
        | { type: "RADIO.BLUR" }
        | { type: "RADIO.SELECT"; value: Item["value"] }
        | { type: "RADIO.SELECT.PREV" }
        | { type: "RADIO.SELECT.NEXT" },
      context: {} as Context,
      input: {} as {
        id: string;
        itemMap?: Map<Item["value"], Item>;
        selectedValue?: Item["value"];
      },
      actions: {} as
        | {
            type: "setFocusedValue";
            params: { value: Item["value"] | null };
          }
        | {
            type: "select";
            params: { value: Item["value"] };
          },
    },
  },
  {
    actions: {
      setFocusedValue: assign(({ action }) => ({
        focusedValue: action.params.value,
      })),
      select: assign(({ action }) => ({ selectedValue: action.params.value })),
    },
    guards: {},
  }
);
