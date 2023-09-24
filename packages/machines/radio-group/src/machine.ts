import { assign, createMachine, pure } from "xstate";
import { Context, Item, Orientation } from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "RadioGroup",
    context: ({ input }) => ({
      id: input.id,
      focusedValue: null,
      selectedValue: input.selectedValue ?? null,
      itemMap: input.itemMap ?? new Map(),
      orientation: input.orientation ?? "vertical",
      disabled: input.disabled ?? false,
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
          "RADIO.SELECT.NEXT": {
            actions: ["selectNext", "focusCurrentSelectedRadio"],
          },
          "RADIO.SELECT.PREV": {
            actions: ["selectPrev", "focusCurrentSelectedRadio"],
          },
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
        orientation?: Orientation;
        disabled?: boolean;
      },
      actions: {} as
        | {
            type: "setFocusedValue";
            params: { value: Item["value"] | null };
          }
        | {
            type: "select";
            params: { value: Item["value"] };
          }
        | { type: "selectNext" }
        | { type: "selectPrev" }
        | { type: "focusCurrentSelectedRadio" },
    },
  },
  {
    actions: {
      setFocusedValue: assign(({ action }) => ({
        focusedValue: action.params.value,
      })),
      select: assign(({ action }) => ({ selectedValue: action.params.value })),
      selectNext: pure(({ context }) => {
        const currentValue = context.focusedValue ?? context.selectedValue;
        const items = Array.from(context.itemMap.values()).filter(
          (item) => !item.disabled
        );
        const currentIndex = items.findIndex(
          (item) => item.value === currentValue
        );
        if (currentIndex === -1) return;
        const nextItem = items[(currentIndex + 1) % items.length];
        return assign({ selectedValue: nextItem.value });
      }),
      selectPrev: pure(({ context }) => {
        const currentValue = context.focusedValue ?? context.selectedValue;
        const items = Array.from(context.itemMap.values()).filter(
          (item) => !item.disabled
        );
        const currentIndex = items.findIndex(
          (item) => item.value === currentValue
        );
        if (currentIndex === -1) return;

        const prevItem = items.at((currentIndex - 1) % items.length);
        if (!prevItem) return;

        return assign({ selectedValue: prevItem.value });
      }),
      focusCurrentSelectedRadio: ({ context }) => {
        if (context.selectedValue === null) return;
        const radioEl = dom.getRadioEl(context, context.selectedValue);
        radioEl?.focus();
      },
    },
  }
);
