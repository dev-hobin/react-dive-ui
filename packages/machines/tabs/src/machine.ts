import { assign, createMachine, pure, raise } from "xstate";
import { MachineContext, MachineEvent } from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "Tabs",
    context: ({ input }) => ({
      id: input.id,
      ids: input?.ids,
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
                "setFocusedValue",
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
              actions: ["setFocusedValue"],
            },
          ],
        },
      },
      focused: {
        on: {
          "TRIGGER.BLUR": {
            target: "idle",
            actions: ["unsetFocusedValue"],
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
            actions: ["focusCurrentPanel"],
          },
        },
      },
    },
    on: {
      "TRIGGER.ACTIVATE": {
        target: "#Tabs",
        actions: ["setValue"],
      },
    },
    types: {
      events: {} as MachineEvent,
      context: {} as MachineContext,
    },
  },
  {
    guards: {
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
      setValue: pure(({ event }) => {
        if (event.type !== "TRIGGER.ACTIVATE") return;
        return assign({ value: event.value });
      }),
      setFocusedValue: pure(({ event }) => {
        if (event.type !== "TRIGGER.FOCUS") return;
        return assign({ value: event.value });
      }),
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
    },
  }
);
