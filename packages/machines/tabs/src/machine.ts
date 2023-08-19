import { assign, createMachine } from "xstate";
import { MachineContext, MachineEvents } from "./types";

export const machine = createMachine(
  {
    id: "Tabs",
    context: ({ input }) => ({
      id: input.id,
      value: input.value,
      orientation: input?.orientation ?? "horizontal",
      activationMode: input?.activationMode ?? "automatic",
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
              actions: ["activateNextTab"],
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
              actions: ["activatePreviousTab"],
            },
            {
              target: "idle",
              actions: ["focusPreviousTab"],
            },
          ],
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
        if (event.type !== "TAB.ACTIVATE") return context;
        const { value } = event;
        return { value };
      }),
      activateNextTab: assign(({ context, event }) => {
        if (event.type !== "TAB.NEXT") return context;
        return context;
      }),
      activatePreviousTab: assign(({ context, event }) => {
        if (event.type !== "TAB.PREVIOUS") return context;
        return context;
      }),
      focusNextTab: ({ context, event }) => {
        if (event.type !== "TAB.NEXT") return context;
        console.log("focusNextTab");
      },
      focusPreviousTab: ({ context, event }) => {
        if (event.type !== "TAB.PREVIOUS") return context;
        console.log("focusPreviousTab");
      },
    },
    guards: {
      isActivationModeAutomatic: ({ context }) =>
        context.activationMode === "automatic",
    },
  }
);
