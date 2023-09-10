import { assign, createMachine, not, pure, raise } from "xstate";
import { MachineContext, MachineEvent, UserInput } from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "RadioGroup",
    initial: "idle",
    context: ({ input }) => ({
      id: input.id,
      ids: input?.ids ?? null,
      value: input?.value ?? null,
      focusedValue: null,
      disabled: input?.disabled ?? false,
      orientation: input?.orientation ?? "vertical",
      form: input?.form ?? null,
    }),
    states: {
      idle: {
        on: {
          "RADIO.FOCUS": [
            {
              guard: not("isSelectedRadioExist"),
              target: "focused",
              actions: [
                "focusFirstSelectableRadio",
                {
                  type: "setFocusedValue",
                  params: ({ event }) => ({ value: event.value }),
                },
              ],
            },
            {
              target: "focused",
              actions: [
                {
                  type: "setFocusedValue",
                  params: ({ event }) => ({ value: event.value }),
                },
              ],
            },
          ],
        },
      },
      focused: {
        on: {
          "RADIO.BLUR": {
            target: "idle",
            actions: ["unsetFocusedValue"],
          },
          "RADIO.FOCUS": {
            actions: [
              {
                type: "setFocusedValue",
                params: ({ event }) => ({ value: event.value }),
              },
              "selectCurrentFocused",
            ],
          },
          "RADIO.SELECT.NEXT": {
            actions: ["focusNextRadio"],
          },
          "RADIO.SELECT.PREV": {
            actions: ["focusPrevRadio"],
          },
        },
      },
    },
    on: {
      "RADIO.SELECT": {
        actions: [
          { type: "setValue", params: ({ event }) => ({ value: event.value }) },
        ],
      },
      "CONTEXT.SET": {
        actions: [
          {
            type: "setContext",
            params: ({ event }) => ({ context: event.context }),
          },
        ],
      },
    },
    types: {
      context: {} as MachineContext,
      events: {} as MachineEvent,
      input: {} as UserInput,
      guards: {} as { type: "isSelectedRadioExist" },
      actions: {} as
        | { type: "setFocusedValue"; params: { value: string } }
        | { type: "setValue"; params: { value: string } }
        | { type: "unsetFocusedValue" }
        | { type: "focusNextRadio" }
        | { type: "focusPrevRadio" }
        | { type: "focusFirstSelectableRadio" }
        | { type: "selectCurrentFocused" }
        | { type: "setContext"; params: { context: Partial<MachineContext> } },
    },
  },
  {
    guards: {
      isSelectedRadioExist: ({ context }) => context.value !== null,
    },
    actions: {
      setFocusedValue: assign(({ action }) => ({
        focusedValue: action.params.value,
      })),
      unsetFocusedValue: assign({ focusedValue: null }),
      focusNextRadio: ({ context }) => {
        if (!context.focusedValue) return;

        const currentRadioEl = dom.getRadioEl(context, context.focusedValue);
        if (!currentRadioEl) return;

        const radioEls = dom.getRadioEls(context);
        if (radioEls.length === 0) return;

        const currentIndex = radioEls.indexOf(currentRadioEl);
        if (currentIndex === -1) return;

        radioEls[getNextIndex(currentIndex, radioEls)]?.focus();
      },
      focusPrevRadio: ({ context }) => {
        if (!context.focusedValue) return;

        const currentRadioEl = dom.getRadioEl(context, context.focusedValue);
        if (!currentRadioEl) return;

        const radioEls = dom.getRadioEls(context);
        if (radioEls.length === 0) return;

        const currentIndex = radioEls.indexOf(currentRadioEl);
        if (currentIndex === -1) return;

        radioEls.at(getPrevIndex(currentIndex, radioEls))?.focus();
      },
      focusFirstSelectableRadio: ({ context }) => {
        const radioEls = dom.getRadioEls(context);
        if (radioEls.length === 0) return;
        radioEls[0]?.focus();
      },
      selectCurrentFocused: pure(({ context }) => {
        if (!context.focusedValue) return;
        return raise({
          type: "RADIO.SELECT",
          value: context.focusedValue,
        });
      }),
      setValue: assign(({ action }) => ({ value: action.params.value })),
      setContext: assign(({ action }) => action.params.context),
    },
  }
);

function getNextIndex(currentIndex: number, array: unknown[]) {
  if (array.length === 0) return 0;
  return (currentIndex + 1) % array.length;
}
function getPrevIndex(currentIndex: number, array: unknown[]) {
  if (array.length === 0) return 0;
  return (currentIndex - 1) % array.length;
}
