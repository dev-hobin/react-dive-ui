import { properties } from "@react-dive-ui/properties";
import { Send, State } from "./types";
import { dom } from "./dom";

export function connect(state: State, send: Send) {
  const context = state.context;
  const form = context.form;

  return {
    controlProps: properties.button({
      id: dom.getControlId(context),
      type: "button",
      role: "checkbox",
      "aria-checked":
        context.checkedState === "indeterminate"
          ? "mixed"
          : context.checkedState === "checked",
      onClick: () => {
        send({ type: "CHECK" });
      },
      disabled: context.disabled,
      "data-state": context.checkedState,
      "data-disabled": context.disabled ? "" : undefined,
    }),
    labelProps: properties.label({
      id: dom.getLabelId(context),
      htmlFor: dom.getControlId(context),
      onClick: (ev) => {
        if (context.disabled) {
          ev.preventDefault();
        }
      },
      "data-state": context.checkedState,
      "data-disabled": context.disabled ? "" : undefined,
    }),
    hiddenInputProps: properties.input({
      type: "checkbox",
      tabIndex: -1,
      id: dom.getHiddenInputId(context),
      value: "on",
      "aria-labelledby": dom.getLabelId(context),
      checked: context.checkedState === "checked",
      name: form ? form.name : undefined,
      required: form?.required ?? undefined,
      onChange: (ev) => {
        send({ type: "SET.CHECKED", checked: ev.target.checked });
      },
      "data-state": context.checkedState,
      "data-disabled": context.disabled ? "" : undefined,
      "aria-hidden": true,
      style: {
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        height: "1px",
        width: "1px",
        margin: "-1px",
        padding: 0,
        border: 0,
      },
    }),
  };
}
