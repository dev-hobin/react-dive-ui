import { createMachine, assign, not, and } from "xstate";
import { Events, Context } from "./types";

export const machine = createMachine(
  {
    id: "Disclosure",
    context: ({ input }) => ({
      id: input.id,
      expanded: input?.expanded ?? false,
      // options
      disabled: input?.disabled ?? false,
    }),
    initial: "idle",
    states: {
      idle: {
        on: {
          "TRIGGER.TOGGLE": [
            {
              target: "idle",
              // @ts-ignore
              guard: and([not("isDisabled"), not("isExpanded")]),
              actions: ["showContent", "onExpandedChange"],
            },
            {
              target: "idle",
              // @ts-ignore
              guard: and([not("isDisabled"), "isExpanded"]),
              actions: ["hideContent", "onExpandedChange"],
            },
            {
              target: "idle",
            },
          ],
          // @ts-ignore
          "TRIGGER.SHOW": {
            target: "idle",
            guard: not("isDisabled"),
            actions: ["showContent", "onExpandedChange"],
          },
          // @ts-ignore
          "TRIGGER.HIDE": {
            target: "idle",
            guard: not("isDisabled"),
            actions: ["hideContent", "onExpandedChange"],
          },
        },
      },
    },
    on: {
      "EXPANDED.SET": {
        target: "#Disclosure",
        actions: ["setIsExpanded", "onExpandedChange"],
      },
      "CONTEXT.SET": {
        target: "#Disclosure",
        actions: ["setContext"],
      },
    },
    types: {
      events: {} as Events,
      context: {} as Context,
    },
  },
  {
    actions: {
      // internals
      showContent: assign({ expanded: true }),
      hideContent: assign({ expanded: false }),
      // listeners
      onExpandedChange: () => {},
      // setters
      setIsExpanded: assign(({ event }) => {
        if (event.type !== "EXPANDED.SET") return {};
        const { expanded } = event;
        return { expanded };
      }),
      // options setters
      setContext: assign(({ event }) => {
        if (event.type !== "CONTEXT.SET") return {};
        const { context } = event;
        return context;
      }),
    },
    guards: {
      isExpanded: ({ context }) => context.expanded,
      isDisabled: ({ context }) => context.disabled,
    },
  }
);
