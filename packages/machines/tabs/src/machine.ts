import { assign, createMachine, not, pure, raise } from "xstate";
import { MachineContext, MachineEvent, UserInput } from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "Tabs",
    context: ({ input }) => ({
      id: input.id,
      ids: input?.ids ?? null,
      value: input?.value ?? null,
      focusedValue: null,
      orientation: input?.orientation ?? "horizontal",
      activationMode: input?.activationMode ?? "automatic",
    }),
    initial: "idle",
    states: {
      idle: {
        on: {
          "TRIGGER.FOCUS": [
            {
              target: "focused",
              guard: "isActivationModeAutomatic",
              actions: [
                {
                  type: "setFocusedValue",
                  params: ({ event }) => ({ value: event.value }),
                },
                "onFocusChange",
                pure(({ context }) => {
                  if (!context.focusedValue) return;
                  return raise({
                    type: "TRIGGER.ACTIVATE",
                    value: context.focusedValue,
                  });
                }),
              ],
            },
            {
              target: "focused",
              actions: [
                {
                  type: "setFocusedValue",
                  params: ({ event }) => ({ value: event.value }),
                },
                "onFocusChange",
              ],
            },
          ],
        },
      },
      focused: {
        on: {
          "TRIGGER.BLUR": {
            target: "idle",
            actions: ["unsetFocusedValue", "onFocusChange"],
          },
          "TRIGGER.FOCUS.NEXT": [
            {
              guard: "isLastTrigger",
              actions: [raise({ type: "TRIGGER.FOCUS.FIRST" })],
            },
            { actions: ["focusNextTrigger"] },
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
          "PANEL.FOCUS.CURRENT": {
            target: "idle",
            actions: ["unsetFocusedValue", "focusCurrentPanel"],
          },
        },
      },
    },
    on: {
      "TRIGGER.ACTIVATE": [
        {
          guard: not({
            type: "isActivatedValue",
            params: ({ event }) => ({ value: event.value }),
          }),
          actions: [
            {
              type: "setValue",
              params: ({ event }) => ({ value: event.value }),
            },
            "onChange",
          ],
        },
      ],
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
      events: {} as MachineEvent,
      context: {} as MachineContext,
      input: {} as UserInput,
      guards: {} as
        | { type: "isActivatedValue"; params: { value: string } }
        | { type: "isActivationModeAutomatic" }
        | { type: "isFirstTrigger" }
        | { type: "isLastTrigger" },
      actions: {} as
        | { type: "setValue"; params: { value: string } }
        | { type: "setFocusedValue"; params: { value: string } }
        | { type: "unsetFocusedValue" }
        | { type: "focusNextTrigger" }
        | { type: "focusPrevTrigger" }
        | { type: "focusFirstTrigger" }
        | { type: "focusLastTrigger" }
        | { type: "focusCurrentPanel" }
        | { type: "setContext"; params: { context: Partial<MachineContext> } }
        | { type: "onChange" }
        | { type: "onFocusChange" },
    },
  },
  {
    guards: {
      isActivatedValue: ({ context, guard }) => {
        return context.value === guard.params.value;
      },
      isActivationModeAutomatic: ({ context }) =>
        context.activationMode === "automatic",
      isFirstTrigger: ({ context }) => {
        if (!context.focusedValue) return false;

        const currentFocusedTabEl = dom.getTriggerEl(
          context,
          context.focusedValue
        );
        if (!currentFocusedTabEl) return false;

        return currentFocusedTabEl === dom.getFirstTriggerEl(context);
      },
      isLastTrigger: ({ context }) => {
        if (!context.focusedValue) return false;

        const currentFocusedTabEl = dom.getTriggerEl(
          context,
          context.focusedValue
        );
        if (!currentFocusedTabEl) return false;

        return currentFocusedTabEl === dom.getLastTriggerEl(context);
      },
    },
    actions: {
      setValue: assign(({ action }) => ({ value: action.params.value })),
      setFocusedValue: assign(({ action }) => ({
        focusedValue: action.params.value,
      })),
      unsetFocusedValue: assign({ focusedValue: null }),
      focusNextTrigger: ({ context }) => {
        if (!context.focusedValue) return;

        const triggerEls = dom.getTriggerEls(context);
        const currentFocusedTriggerEl = dom.getTriggerEl(
          context,
          context.focusedValue
        );
        if (!currentFocusedTriggerEl) return;

        const currentIndex = triggerEls.indexOf(currentFocusedTriggerEl);
        if (currentIndex === -1) return;

        triggerEls[currentIndex + 1].focus();
      },
      focusPrevTrigger: ({ context }) => {
        if (!context.focusedValue) return;

        const triggerEls = dom.getTriggerEls(context);
        const currentFocusedTriggerEl = dom.getTriggerEl(
          context,
          context.focusedValue
        );
        if (!currentFocusedTriggerEl) return;

        const currentIndex = triggerEls.indexOf(currentFocusedTriggerEl);
        if (currentIndex === -1) return;

        triggerEls[currentIndex - 1].focus();
      },
      focusFirstTrigger: ({ context }) => {
        dom.getFirstTriggerEl(context)?.focus();
      },
      focusLastTrigger: ({ context }) => {
        dom.getLastTriggerEl(context)?.focus();
      },
      focusCurrentPanel: ({ context }) => {
        if (!context.value) return;
        dom.getPanelEl(context, context.value)?.focus();
      },
      setContext: assign(({ action }) => action.params.context),

      // override
      onChange: () => {},
      onFocusChange: () => {},
    },
  }
);
