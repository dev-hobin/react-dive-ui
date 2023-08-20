import { assign, createMachine } from "xstate";
import { MachineContext, MachineEvents } from "./types";

export const machine = createMachine(
  {
    id: "Switch",
    context: ({ input }) => ({
      id: input.id,
      checked: input?.checked ?? false,
      disabled: input?.disabled ?? false,
      name: input?.name ?? undefined,
      required: input?.required ?? false,
      value: input?.value ?? "on",
    }),
    initial: "idle",
    states: {
      idle: {
        on: {
          "SWITCH.TOGGLE": {
            target: "idle",
            actions: ["toggleSwitch"],
          },
          "SWITCH.ON": {
            target: "idle",
            actions: ["checkSwitch"],
          },
          "SWITCH.OFF": {
            target: "idle",
            actions: ["uncheckSwitch"],
          },
          "CONTEXT.UPDATE": {
            target: "idle",
            actions: ["updateContext"],
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
      toggleSwitch: () => {},
      checkSwitch: () => {},
      uncheckSwitch: () => {},
      updateContext: assign(({ event, context }) => {
        if (event.type !== "CONTEXT.UPDATE") return {};
        return { ...context, ...event.context };
      }),
    },
  }
);
