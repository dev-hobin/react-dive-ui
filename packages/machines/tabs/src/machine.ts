import { assign, createMachine, pure, raise } from "xstate";
import { Actions, Context, Events, Guards, Input } from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "Tabs",
    context: ({ input }) => ({
      id: input.id,
      value: input.value,
      focusedValue: null,
      orientation: input?.orientation ?? "horizontal",
      activationMode: input?.activationMode ?? "automatic",
    }),
    initial: "idle",
    states: {
      idle: {
        on: {
          "TRIGGER.FOCUSED": [
            {
              target: "focused",
              guard: "isAutomaticMode",
              actions: [
                {
                  type: "setFocusedValue",
                  params: ({ event }) => ({ value: event.value }),
                },
                pure(({ event }) =>
                  raise({ type: "ITEM.ACTIVATE", value: event.value })
                ),
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
          "TRIGGER.BLURRED": {
            target: "idle",
            actions: [
              {
                type: "setFocusedValue",
                params: { value: null },
              },
            ],
          },
          "TRIGGER.FOCUS.NEXT": [{ actions: ["focusNextTrigger"] }],
          "TRIGGER.FOCUS.PREV": [{ actions: ["focusPrevTrigger"] }],
        },
      },
    },
    on: {
      "ITEM.ACTIVATE": [
        {
          guard: {
            type: "isItemDisabled",
            params: ({ event }) => ({ value: event.value }),
          },
        },
        {
          actions: [
            {
              type: "setValue",
              params: ({ event }) => ({ value: event.value }),
            },
          ],
        },
      ],
    },
    types: {
      context: {} as Context,
      input: {} as Input,
      events: {} as Events,
      actions: {} as Actions,
      guards: {} as Guards,
    },
  },
  {
    guards: {
      isAutomaticMode: ({ context }) => {
        return context.activationMode === "automatic";
      },
    },
    actions: {
      setFocusedValue: assign(({ action }) => ({
        focusedValue: action.params.value,
      })),
      setValue: assign(({ action }) => ({ value: action.params.value })),
      focusNextTrigger: ({ context }) => {
        const focusedValue = context.focusedValue;
        if (!focusedValue) return;

        const triggerEls = dom.getTriggerEls(context);
        if (triggerEls.length === 0) return;

        const currentIndex = triggerEls.findIndex(
          (el) => el.id === dom.getTriggerId(context, focusedValue)
        );
        if (currentIndex === -1) return;

        triggerEls[(currentIndex + 1) % triggerEls.length].focus();
      },
      focusPrevTrigger: ({ context }) => {
        const focusedValue = context.focusedValue;
        if (!focusedValue) return;

        const triggerEls = dom.getTriggerEls(context);
        if (triggerEls.length === 0) return;

        const currentIndex = triggerEls.findIndex(
          (el) => el.id === dom.getTriggerId(context, focusedValue)
        );
        if (currentIndex === -1) return;

        triggerEls.at((currentIndex - 1) % triggerEls.length)?.focus();
      },

      // template
      onChange: () => {},
    },
  }
);
