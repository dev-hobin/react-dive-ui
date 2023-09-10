import { and, assign, createMachine, not, pure, raise } from "xstate";
import {
  MachineAction,
  MachineContext,
  MachineEvent,
  MachineGuard,
  UserInput,
} from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "Accordion",
    initial: "idle",
    context: ({ input }) => ({
      id: input.id,
      type: input.type,
      ids: input?.ids ?? null,
      expandedValues: input?.expandedValues ?? [],
      collapsible: input?.collapsible ?? true,
      orientation: input?.orientation ?? "vertical",
      focusedValue: null,
    }),
    states: {
      idle: {
        on: {
          "TRIGGER.FOCUS": {
            target: "focused",
            actions: [
              {
                type: "setFocusedItem",
                params: ({ event }) => ({ value: event.value }),
              },
              "onFocusChange",
            ],
          },
        },
      },
      focused: {
        on: {
          "TRIGGER.BLUR": {
            target: "idle",
            actions: ["unsetFocusedItem", "onFocusChange"],
          },
          "TRIGGER.FOCUS.NEXT": [
            {
              guard: "isLastTrigger",
              actions: [raise({ type: "TRIGGER.FOCUS.FIRST" })],
            },
            {
              actions: ["focusNextTrigger"],
            },
          ],
          "TRIGGER.FOCUS.PREV": [
            {
              guard: "isFirstTrigger",
              actions: [raise({ type: "TRIGGER.FOCUS.LAST" })],
            },
            {
              actions: ["focusPrevTrigger"],
            },
          ],
          "TRIGGER.FOCUS.FIRST": {
            actions: ["focusFirstTrigger"],
          },
          "TRIGGER.FOCUS.LAST": {
            actions: ["focusLastTrigger"],
          },
        },
      },
    },
    on: {
      "ITEM.TOGGLE": [
        {
          guard: {
            type: "isItemExpanded",
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
      "ITEM.EXPAND": [
        {
          guard: {
            type: "isItemExpanded",
            params: ({ event }) => ({ value: event.value }),
          },
        },
        {
          guard: "isSingleType",
          actions: [
            {
              type: "switchItem",
              params: ({ event }) => ({ value: event.value }),
            },
            "onChange",
          ],
        },
        {
          actions: [
            {
              type: "expandItem",
              params: ({ event }) => ({ value: event.value }),
            },
            "onChange",
          ],
        },
      ],
      "ITEM.COLLAPSE": [
        {
          guard: not({
            type: "isItemExpanded",
            params: ({ event }) => ({ value: event.value }),
          }),
        },
        { guard: and(["isSingleType", not("isCollapsible")]) },
        {
          actions: [
            {
              type: "collapseItem",
              params: ({ event }) => ({ value: event.value }),
            },
            "onChange",
          ],
        },
      ],
    },
    types: {
      context: {} as MachineContext,
      events: {} as MachineEvent,
      input: {} as UserInput,
      guards: {} as MachineGuard,
      actions: {} as MachineAction,
    },
  },
  {
    guards: {
      isItemExpanded: ({ context, guard }) => {
        const { value } = guard.params;
        return context.expandedValues.includes(value);
      },
      isSingleType: ({ context }) => context.type === "single",
      isCollapsible: ({ context }) => context.collapsible,
      isLastTrigger: ({ context }) => {
        if (!context.focusedValue) return false;
        const currentTriggerEl = dom.getTriggerEl(
          context,
          context.focusedValue
        );
        if (!currentTriggerEl) return false;

        const triggerEls = dom.getTriggerEls(context);
        const lastTriggerEl = triggerEls.at(-1);

        return currentTriggerEl === lastTriggerEl;
      },
      isFirstTrigger: ({ context }) => {
        if (!context.focusedValue) return false;
        const currentTriggerEl = dom.getTriggerEl(
          context,
          context.focusedValue
        );
        if (!currentTriggerEl) return false;

        const triggerEls = dom.getTriggerEls(context);
        const firstTriggerEl = triggerEls.at(0);

        return currentTriggerEl === firstTriggerEl;
      },
    },
    actions: {
      switchItem: assign(({ action }) => ({
        expandedValues: [action.params.value],
      })),
      expandItem: assign(({ context, action }) => ({
        expandedValues: [...context.expandedValues, action.params.value],
      })),
      collapseItem: assign(({ context, action }) => ({
        expandedValues: context.expandedValues.filter(
          (value) => value !== action.params.value
        ),
      })),
      setFocusedItem: assign(({ action }) => ({
        focusedValue: action.params.value,
      })),
      unsetFocusedItem: assign({ focusedValue: null }),
      focusNextTrigger: ({ context }) => {
        if (!context.focusedValue) return;

        const currentTriggerEl = dom.getTriggerEl(
          context,
          context.focusedValue
        );
        if (!currentTriggerEl) return;

        const triggerEls = dom.getTriggerEls(context);
        const currentIndex = triggerEls.indexOf(currentTriggerEl);
        if (currentIndex === -1) return;

        const nextTriggerEl = triggerEls[currentIndex + 1];
        nextTriggerEl.focus();
      },
      focusPrevTrigger: ({ context }) => {
        if (!context.focusedValue) return;

        const currentTriggerEl = dom.getTriggerEl(
          context,
          context.focusedValue
        );
        if (!currentTriggerEl) return;

        const triggerEls = dom.getTriggerEls(context);
        const currentIndex = triggerEls.indexOf(currentTriggerEl);
        if (currentIndex === -1) return;

        const prevTriggerEl = triggerEls[currentIndex - 1];
        prevTriggerEl.focus();
      },
      focusFirstTrigger: ({ context }) => {
        dom.getTriggerEls(context)[0]?.focus();
      },
      focusLastTrigger: ({ context }) => {
        dom.getTriggerEls(context).at(-1)?.focus();
      },

      // template
      onChange: () => {},
      onFocusChange: () => {},
    },
  }
);
