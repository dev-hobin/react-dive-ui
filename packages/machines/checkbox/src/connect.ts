import { properties } from "@react-dive-ui/properties";
import { Service } from "./types";
import { dom } from "./dom";

export function connect(service: Service) {
  const snapshot = service.getSnapshot();
  const context = snapshot.context;
  const send = service.send;

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
    }),
    labelProps: properties.label({
      id: dom.getLabelId(context),
      htmlFor: dom.getHiddenInputId(context),
    }),
    hiddenInputProps: properties.input({
      type: "checkbox",
      id: dom.getHiddenInputId(context),
      value: "on",
      "aria-labelledby": dom.getLabelId(context),
      checked: context.checkedState === "checked",
      onChange: (ev) => {
        send({ type: "SET.CHECKED", checked: ev.target.checked });
      },
    }),
  };
}
