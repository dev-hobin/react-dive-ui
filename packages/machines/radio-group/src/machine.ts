import { assign, createMachine, pure, raise } from "xstate";
import { MachineContext, MachineEvent } from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "RadioGroup",
    initial: "idle",
    context: ({ input }) => ({
      id: input?.id,
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
          "RADIO.FOCUS": {
            target: "focused",
            actions: ["setFocusedValue"],
          },
        },
      },
      focused: {
        on: {
          "RADIO.BLUR": {
            target: "idle",
            actions: ["unsetFocusedValue"],
          },
          "RADIO.SELECT.NEXT": {
            actions: ["focusNextRadio", "selectCurrentFocused"],
          },
          "RADIO.SELECT.PREV": {
            actions: ["focusPrevRadio", "selectCurrentFocused"],
          },
        },
      },
    },
    on: {
      "RADIO.SELECT": {
        actions: ["setValue"],
      },
      "CONTEXT.SET": {
        actions: ["setContext"],
      },
    },
    types: {
      context: {} as MachineContext,
      events: {} as MachineEvent,
    },
  },
  {
    actions: {
      setFocusedValue: pure(({ event }) => {
        if (event.type !== "RADIO.FOCUS") return;
        return assign({ focusedValue: event.value });
      }),
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
      selectCurrentFocused: pure(({ context }) => {
        if (!context.focusedValue) return;
        return raise({
          type: "RADIO.SELECT",
          value: context.focusedValue,
        });
      }),
      setValue: pure(({ event }) => {
        if (event.type !== "RADIO.SELECT") return;
        return assign({ value: event.value });
      }),
      setContext: pure(({ event }) => {
        if (event.type !== "CONTEXT.SET") return;
        return assign(event.context);
      }),
    },
  }
);

function getNextIndex(currentIndex: number, array: unknown[]) {
  if (array.length === 0) return 0;
  return (currentIndex + 1) % array.length;
}
function getPrevIndex(currentIndex: number, array: unknown[]) {
  if (array.length === 0) return 0;
  return -((currentIndex + 1) % array.length);
}
