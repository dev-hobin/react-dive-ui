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
        if (currentValue === null) return;

        const radioEls = dom.getRadioEls(context);
        if (radioEls.length === 0) return;

        const currentIndex = radioEls.findIndex(
          (el) => el.id === dom.getRadioId(context, currentValue)
        );
        if (currentIndex === -1) return;

        const nextValue =
          radioEls[(currentIndex + 1) % radioEls.length].dataset.value;
        if (nextValue === undefined) return;

        return assign({ selectedValue: nextValue });
      }),
      selectPrev: pure(({ context }) => {
        const currentValue = context.focusedValue ?? context.selectedValue;
        if (currentValue === null) return;

        const radioEls = dom.getRadioEls(context);
        if (radioEls.length === 0) return;

        const currentIndex = radioEls.findIndex(
          (el) => el.id === dom.getRadioId(context, currentValue)
        );
        if (currentIndex === -1) return;

        const prevValue = radioEls.at((currentIndex - 1) % radioEls.length)
          ?.dataset.value;
        if (prevValue === undefined) return;

        return assign({ selectedValue: prevValue });
      }),
      focusCurrentSelectedRadio: ({ context }) => {
        if (context.selectedValue === null) return;
        const radioEl = dom.getRadioEl(context, context.selectedValue);
        radioEl?.focus();
      },
    },
  }
);
