import { assign, createMachine } from "xstate";
import { Context, Events, Actions, Guards, CheckedState, Input } from "./types";
import { dom } from "./dom";

export const machine = createMachine(
  {
    id: "Checkbox",
    context: ({ input }) => ({
      id: input.id,
      checkedState: input?.checkedState ?? "unchecked",
      disabled: input?.disabled ?? false,
      value: input?.value ?? "on",
      form: input?.form ?? null,
    }),
    initial: "idle",
    entry: ["syncInputWithIndeterminate"],
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
                "syncInputWithIndeterminate",
                "dispatchCheckedEvent",
                "onChange",
              ],
            },
            {
              actions: [
                "toggleCheckedState",
                "syncInputWithIndeterminate",
                "dispatchCheckedEvent",
                "onChange",
              ],
            },
          ],
          "SET.INDETERMINATE": {
            actions: [
              {
                type: "setCheckedState",
                params: { checkedState: "indeterminate" },
              },
              "syncInputWithIndeterminate",
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
              "syncInputWithIndeterminate",
              "dispatchCheckedEvent",
              "onChange",
            ],
          },
        },
      },
    },
    types: {
      context: {} as Context,
      input: {} as Input,
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
      syncInputWithIndeterminate: ({ context }) => {
        const inputEl = dom.getHiddenInputEl(context);
        if (!inputEl) return;

        inputEl.indeterminate = context.checkedState === "indeterminate";
      },
      dispatchCheckedEvent: ({ context }) => {
        const checked = context.checkedState === "checked";

        const inputEl = dom.getHiddenInputEl(context);
        if (!inputEl) return;
        if (!(inputEl instanceof globalThis.HTMLInputElement)) return;

        const prototype = Object.getPrototypeOf(inputEl);
        const descriptor = Object.getOwnPropertyDescriptor(
          prototype,
          "checked"
        );
        if (!descriptor) return;

        descriptor.set?.call(inputEl, checked);
        inputEl.dispatchEvent(new globalThis.Event("click", { bubbles: true }));
      },

      // template
      onChange: () => {},
    },
    guards: {
      isDisabled: ({ context }) => context.disabled,
      isIndeterminate: ({ context }) =>
        context.checkedState === "indeterminate",
    },
  }
);
