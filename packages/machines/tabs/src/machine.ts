import { assign, createMachine, pure, raise } from "xstate";
import { Actions, Context, Events, Guards, Input } from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "Tabs",
    context: ({ input }) => ({
      id: input.id,
      focusedValue: null,
      value: input?.value ?? null,
      itemMap: input?.itemMap ?? new Map(),
      orientation: input?.orientation ?? "horizontal",
      activationMode: input?.activationMode ?? "automatic",
    }),
    initial: "idle",
    states: {
      idle: {
        on: {
          "TRIGGER.FOCUSED": {
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
          "TRIGGER.BLURRED": {
            target: "idle",
            actions: [
              {
                type: "setFocusedValue",
                params: { value: null },
              },
            ],
          },
          "TRIGGER.FOCUS.NEXT": [
            {
              guard: "isAutomaticMode",
              actions: [
                "focusNextTrigger",
                pure(({ context }) => {
                  if (!context.focusedValue) return;
                  return raise({
                    type: "ITEM.ACTIVATE",
                    value: context.focusedValue,
                  });
                }),
              ],
            },
            {
              actions: ["focusNextTrigger"],
            },
          ],
          "TRIGGER.FOCUS.PREV": [
            {
              guard: "isAutomaticMode",
              actions: [
                "focusPrevTrigger",
                pure(({ context }) => {
                  if (!context.focusedValue) return;
                  return raise({
                    type: "ITEM.ACTIVATE",
                    value: context.focusedValue,
                  });
                }),
              ],
            },
            {
              actions: ["focusPrevTrigger"],
            },
          ],
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
      isItemDisabled: ({ context, guard }) => {
        const item = context.itemMap.get(guard.params.value);
        return item?.disabled ?? true;
      },
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
    },
  }
);
