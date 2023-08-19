import { assign, createMachine } from "xstate";
import { MachineContext, MachineEvents } from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "Tabs",
    context: ({ input }) => ({
      id: input.id,
      value: input.value,
      orientation: input?.orientation ?? "horizontal",
      activationMode: input?.activationMode ?? "automatic",
      disabledValues: input?.disabledValues ?? [],
    }),
    initial: "idle",
    states: {
      idle: {
        on: {
          "TAB.ACTIVATE": {
            target: "idle",
            actions: ["activateTab"],
          },
          "TAB.NEXT": [
            {
              target: "idle",
              guard: "isActivationModeAutomatic",
              actions: ["activateNextTab", "focusCurrentTab"],
            },
            {
              target: "idle",
              actions: ["focusNextTab"],
            },
          ],
          "TAB.PREVIOUS": [
            {
              target: "idle",
              guard: "isActivationModeAutomatic",
              actions: ["activatePreviousTab", "focusCurrentTab"],
            },
            {
              target: "idle",
              actions: ["focusPreviousTab"],
            },
          ],
          "TAB.SET.DISABLED": {
            target: "idle",
            actions: ["setTabDisabled"],
          },
        },
      },
    },
    types: {
      events: {} as MachineEvents,
      context: {} as MachineContext,
    },
  },
  {
    actions: {
      activateTab: assign(({ context, event }) => {
        if (event.type !== "TAB.ACTIVATE") return {};

        const { value } = event;
        const { disabledValues } = context;
        if (disabledValues.includes(value)) return {};

        return { value };
      }),
      activateNextTab: assign(({ context }) => {
        const tabEls = dom.findTriggers(context.id);
        const currentTabEl = dom.findTrigger(context.id, context.value);
        if (!currentTabEl) return {};

        const currentIndex = tabEls.indexOf(currentTabEl);
        if (currentIndex === -1) return {};

        const nextTabEl = tabEls[currentIndex + 1]
          ? tabEls[currentIndex + 1]
          : tabEls[0];
        if (!nextTabEl) return {};

        const nextTabValue = nextTabEl.dataset.value;
        if (!nextTabValue) return {};

        return { value: nextTabValue };
      }),
      activatePreviousTab: assign(({ context }) => {
        const tabEls = dom.findTriggers(context.id);
        const currentTabEl = dom.findTrigger(context.id, context.value);
        if (!currentTabEl) return {};

        const currentIndex = tabEls.indexOf(currentTabEl);
        if (currentIndex === -1) return {};

        const previousTabEl = tabEls[currentIndex - 1]
          ? tabEls[currentIndex - 1]
          : tabEls[tabEls.length - 1];
        if (!previousTabEl) return {};

        const previousTabValue = previousTabEl.dataset.value;
        if (!previousTabValue) return {};

        return { value: previousTabValue };
      }),
      focusCurrentTab: ({ context }) => {
        const currentTab = dom.findTrigger(context.id, context.value);
        currentTab?.focus();
      },
      focusNextTab: ({ context }) => {
        const tabEls = dom.findTriggers(context.id);
        const currentTabEl = dom.findTrigger(context.id, context.value);
        if (!currentTabEl) return;

        const currentIndex = tabEls.indexOf(currentTabEl);
        if (currentIndex === -1) return;

        const nextTabEl = tabEls[currentIndex + 1]
          ? tabEls[currentIndex + 1]
          : tabEls[0];
        if (!nextTabEl) return;
        nextTabEl.focus();
      },
      focusPreviousTab: ({ context }) => {
        const tabEls = dom.findTriggers(context.id);
        const currentTabEl = dom.findTrigger(context.id, context.value);
        if (!currentTabEl) return;

        const currentIndex = tabEls.indexOf(currentTabEl);
        if (currentIndex === -1) return;

        const previousTabEl = tabEls[currentIndex - 1]
          ? tabEls[currentIndex - 1]
          : tabEls[tabEls.length - 1];
        if (!previousTabEl) return;

        previousTabEl.focus();
      },
      setTabDisabled: assign(({ context, event }) => {
        if (event.type !== "TAB.SET.DISABLED") return {};
        const { disabledValues } = context;
        const { value, disabled } = event;

        if (disabled) {
          if (disabledValues.includes(value)) return {};
          else {
            return {
              disabledValues: [...disabledValues, value],
            };
          }
        } else {
          return {
            disabledValues: disabledValues.filter((v) => !value),
          };
        }
      }),
    },
    guards: {
      isActivationModeAutomatic: ({ context }) =>
        context.activationMode === "automatic",
    },
  }
);
