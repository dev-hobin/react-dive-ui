import { assign, createMachine } from "xstate";
import { Context, Events } from "./types";

export const machine = createMachine(
  {
    id: "Accordion",
    context: ({ input }) => ({
      values: input?.values ?? [],
      type: input?.type ?? "single",
      collapsible: input?.collapsible ?? true,
      disabled: input?.disabled ?? false,
      orientation: input?.orientation ?? "vertical",
    }),
    initial: "idle",
    states: {
      idle: {
        on: {
          "ITEM.TOGGLE": [
            {
              target: "idle",
              guard: "isDisabled",
            },
            {
              target: "idle",
              actions: ["toggleItem"],
            },
          ],
        },
      },
    },
    types: {
      events: {} as Events,
      context: {} as Context,
    },
  },
  {
    actions: {
      toggleItem: assign(({ context, event }) => {
        if (event.type !== "ITEM.TOGGLE") return {};
        const { type, values, collapsible } = context;
        const { value } = event;
        if (type === "single") {
          if (values[0] === value && collapsible) {
            return { values: [] };
          } else {
            return { values: [value] };
          }
        } else if (type === "multiple") {
          if (values.includes(value)) {
            return { values: values.filter((v) => v === value) };
          } else {
            return { values: [...values, value] };
          }
        }
        return {};
      }),
    },
    guards: {
      isDisabled: ({ context }) => !!context.disabled,
    },
  }
);
