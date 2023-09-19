import { assign, createMachine } from "xstate";
import { Context, Events, Actions, Guards, CheckedState } from "./types";

export const machine = createMachine(
  {
    id: "Checkbox",
    context: {
      id: "id",
      checkedState: "checked",
      disabled: false,
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          CHECK: [
            { guard: "isDisabled" },
            {
              guard: "isIndeterminate",
              actions: [
                {
                  type: "setCheckedState",
                  params: {
                    checkedState: "checked",
                  },
                },
              ],
            },
            { actions: ["toggleCheckedState"] },
          ],
          "SET.INDETERMINATE": {
            actions: [
              {
                type: "setCheckedState",
                params: { checkedState: "indeterminate" },
              },
            ],
          },
          "SET.DISABLED": {
            actions: [
              {
                type: "setDisabled",
                params: ({ event }) => ({ disabled: event.disabled }),
              },
            ],
          },
          "SET.CHECKED": {
            actions: [
              {
                type: "setCheckedState",
                params: ({ event }) => ({
                  checkedState: event.checked ? "checked" : "unchecked",
                }),
              },
            ],
          },
        },
      },
    },
    types: {
      context: {} as Context,
      events: {} as Events,
      actions: {} as Actions,
      guards: {} as Guards,
    },
  },
  {
    actions: {
      setCheckedState: assign(({ action }) => ({
        checkedState: action.params.checkedState,
      })),
      toggleCheckedState: assign(({ context }) => {
        const checkedState: CheckedState =
          context.checkedState === "checked" ? "unchecked" : "checked";
        return { checkedState };
      }),
      setDisabled: assign(({ action }) => ({
        disabled: action.params.disabled,
      })),
    },
    guards: {
      isDisabled: ({ context }) => context.disabled,
      isIndeterminate: ({ context }) =>
        context.checkedState === "indeterminate",
    },
  }
);
