import { properties } from "@react-dive-ui/properties";
import { MachineSend, MachineState } from "./types";
import { dom } from "./dom";

export function connect(state: MachineState, send: MachineSend) {
  const { context } = state;

  return {
    groupProps: properties.element({
      id: dom.getGroupId(context),
      role: "radiogroup",
      "data-part": "group",
      "data-disabled": context.disabled ? "" : undefined,
    }),
    getRadioProps(value: string, disabled = false) {
      return properties.button({
        type: "button",
        id: dom.getRadioId(context, value),
        role: "radio",
        disabled: disabled || context.disabled,
        tabIndex: context.value === value || value === null ? 0 : -1,
        "aria-checked": context.value === value,
        "aria-labelledby": dom.getLabelEl(context, value)
          ? dom.getLabelId(context, value)
          : undefined,
        "data-part": "radio",
        "data-state": context.value === value ? "checked" : "unchecked",
        "data-disabled": disabled || context.disabled ? "" : undefined,

        onClick() {
          send({ type: "RADIO.SELECT", value });
        },
        onFocus() {
          send({ type: "RADIO.FOCUS", value });
        },
        onBlur() {
          send({ type: "RADIO.BLUR" });
        },
        onKeyDown(ev) {
          if (context.orientation === "vertical") {
            if (ev.key === "ArrowUp") {
              send({ type: "RADIO.SELECT.PREV" });
            } else if (ev.key === "ArrowDown") {
              send({ type: "RADIO.SELECT.NEXT" });
            }
          } else {
            if (ev.key === "ArrowRight") {
              send({ type: "RADIO.SELECT.NEXT" });
            } else if (ev.key === "ArrowLeft") {
              send({ type: "RADIO.SELECT.PREV" });
            }
          }
        },
      });
    },
    getLabelProps(value: string, disabled = false) {
      return properties.label({
        id: dom.getLabelId(context, value),
        htmlFor: dom.getRadioId(context, value),
        "data-part": "label",
        "data-state": context.value === value ? "checked" : "unchecked",
        "data-disabled": disabled || context.disabled ? "" : undefined,
      });
    },
    getIndicatorProps(value: string, disabled = false) {
      return properties.element({
        id: dom.getIndicatorId(context, value),
        "data-part": "indicator",
        "data-state": context.value === value ? "checked" : "unchecked",
        "data-disabled": disabled || context.disabled ? "" : undefined,
      });
    },
  };
}
