import { properties } from "@react-dive-ui/properties";
import { Service } from "./types";
import { dom } from "./dom";

export function connect(service: Service) {
  const snapshot = service.getSnapshot();
  const context = snapshot.context;
  const send = service.send;

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
      "data-state": context.checkedState,
      "data-disabled": context.disabled ? "" : undefined,
    }),
    labelProps: properties.label({
      id: dom.getLabelId(context),
      htmlFor: dom.getHiddenInputId(context),
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
        pointerEvents: "none",
        opacity: 0,
        margin: 0,
        width: 1,
        height: 1,
      },
    }),
  };
}