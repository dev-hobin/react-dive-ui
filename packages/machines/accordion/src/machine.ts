import { and, assign, createMachine, not, pure, raise } from "xstate";
import { MachineContext, MachineEvent } from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "Accordion",
    initial: "idle",
    context: ({ input }) => ({
      id: input.id,
      ids: input?.ids,
      type: input.type,
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
            actions: ["setFocusedItem", "onFocusChange"],
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
          guard: "isItemExpanded",
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
        { guard: "isItemExpanded" },
        {
          guard: "isSingleType",
          actions: ["switchItem", "onChange"],
        },
        { actions: ["expandItem", "onChange"] },
      ],
      "ITEM.COLLAPSE": [
        { guard: not("isItemExpanded") },
        { guard: and(["isSingleType", not("isCollapsible")]) },
        { actions: ["collapseItem", "onChange"] },
      ],
    },
    types: {
      context: {} as MachineContext,
      events: {} as MachineEvent,
    },
  },
  {
    guards: {
      isItemExpanded: ({ context, event }) => {
        if (!("value" in event)) return false;
        return context.expandedValues.includes(event.value);
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
      switchItem: pure(({ event }) => {
        if (event.type !== "ITEM.EXPAND") return;
        return assign({ expandedValues: [event.value] });
      }),
      expandItem: pure(({ context, event }) => {
        if (event.type !== "ITEM.EXPAND") return;
        return assign({
          expandedValues: [...context.expandedValues, event.value],
        });
      }),
      collapseItem: pure(({ context, event }) => {
        if (event.type !== "ITEM.COLLAPSE") return;
        return assign({
          expandedValues: context.expandedValues.filter(
            (value) => value !== event.value
          ),
        });
      }),
      setFocusedItem: pure(({ event }) => {
        if (event.type !== "TRIGGER.FOCUS") return;
        return assign({ focusedValue: event.value });
      }),
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
