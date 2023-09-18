import { createMachine, and, assign, not, pure, raise } from "xstate";
import { Input, Context, Events, Actions, Guards } from "./types";

export const machine = createMachine(
  {
    id: "Accordion",
    initial: "idle",
    context: ({ input }) => ({
      id: input.id,
      type: input.type,
      focusedValue: null,
      expandedValues: input.expandedValues ?? [],
      itemMap: input.itemMap ?? new Map(),
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
        },
      },
    },
    on: {
      "ITEM.EXPAND": [
        {
          guard: {
            type: "isItemDisabled",
            params: ({ event }) => ({ value: event.value }),
          },
        },
        {
          guard: and(["isSingleType", "hasExpandedItem"]),
          actions: [
            {
              type: "resetExpandedValuesWith",
              params: ({ event }) => ({ value: event.value }),
            },
          ],
        },
        {
          actions: [
            {
              type: "addToExpandedValues",
              params: ({ event }) => ({ value: event.value }),
            },
          ],
        },
      ],
      "ITEM.COLLAPSE": [
        {
          guard: {
            type: "isItemDisabled",
            params: ({ event }) => ({ value: event.value }),
          },
        },
        {
          guard: and(["isSingleType", "hasExpandedItem", not("isCollapsible")]),
        },
        {
          actions: [
            {
              type: "removeFromExpandedValues",
              params: ({ event }) => ({ value: event.value }),
            },
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
      "SET.ITEM.DISABLED": {
        actions: [
          {
            type: "setItemDisabled",
            params: ({ event }) => ({
              value: event.value,
              disabled: event.disabled,
            }),
          },
        ],
      },
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
      setItemDisabled: assign(({ context, action }) => {
        const { value, disabled } = action.params;
        const item = context.itemMap.get(value);
        if (!item) return {};

        context.itemMap.set(value, { ...item, disabled });
        return {
          itemMap: new Map(context.itemMap),
        };
      }),
      setFocusedValue: assign(({ action }) => ({
        focusedValue: action.params.value,
      })),
    },
  }
);
