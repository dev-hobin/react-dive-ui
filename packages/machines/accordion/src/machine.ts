import { createMachine, and, assign, not, pure, raise } from "xstate";
import { Input, Context, Events, Actions, Guards } from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "Accordion",
    initial: "idle",
    context: ({ input }) => ({
      id: input.id,
      type: input.type,
      focusedValue: null,
      expandedValues: input.expandedValues ?? [],
      collapsible: input.collapsible ?? false,
      orientation: input.orientation ?? "vertical",
    }),
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
          "TRIGGER.FOCUS.NEXT": {
            actions: ["focusNextTrigger"],
          },
          "TRIGGER.FOCUS.PREV": {
            actions: ["focusPrevTrigger"],
          },
        },
      },
    },
    on: {
      "ITEM.EXPAND": [
        {
          guard: and(["isSingleType", "hasExpandedItem"]),
          actions: [
            {
              type: "resetExpandedValuesWith",
              params: ({ event }) => ({ value: event.value }),
            },
            "onChange",
          ],
        },
        {
          actions: [
            {
              type: "addToExpandedValues",
              params: ({ event }) => ({ value: event.value }),
            },
            "onChange",
          ],
        },
      ],
      "ITEM.COLLAPSE": [
        {
          guard: and(["isSingleType", "hasExpandedItem", not("isCollapsible")]),
        },
        {
          actions: [
            {
              type: "removeFromExpandedValues",
              params: ({ event }) => ({ value: event.value }),
            },
            "onChange",
          ],
        },
      ],
      "ITEM.TOGGLE": [
        {
          guard: {
            type: "isExpandedItem",
            params: ({ event }) => ({ value: event.value }),
          },
          actions: pure(({ event }) =>
            raise({ type: "ITEM.COLLAPSE", value: event.value })
          ),
        },
        {
          actions: pure(({ event }) =>
            raise({ type: "ITEM.EXPAND", value: event.value })
          ),
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
      isCollapsible: ({ context }) => {
        return context.collapsible;
      },
      isExpandedItem: ({ context, guard }) => {
        return context.expandedValues.includes(guard.params.value);
      },
      hasExpandedItem: ({ context }) => {
        return context.expandedValues.length > 0;
      },
      isSingleType: ({ context }) => {
        return context.type === "single";
      },
    },
    actions: {
      addToExpandedValues: assign(({ context, action }) => ({
        expandedValues: [...context.expandedValues, action.params.value],
      })),
      removeFromExpandedValues: assign(({ context, action }) => ({
        expandedValues: context.expandedValues.filter(
          (v) => v !== action.params.value
        ),
      })),
      toggleValueInExpandedValues: assign(({ context, action }) => {
        const value = action.params.value;
        const expandedValues = context.expandedValues;
        if (expandedValues.includes(value)) {
          return { expandedValues: expandedValues.filter((v) => v !== value) };
        } else {
          return { expandedValues: [...expandedValues, value] };
        }
      }),
      resetExpandedValuesWith: assign(({ action }) => {
        return {
          expandedValues: [action.params.value],
        };
      }),
      setFocusedValue: assign(({ action }) => ({
        focusedValue: action.params.value,
      })),
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
