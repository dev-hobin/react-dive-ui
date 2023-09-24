import { properties } from "@react-dive-ui/properties";
import { Item, Service, Status } from "./types";
import { dom } from "./dom";

export function connect(service: Service) {
  const snapshot = service.getSnapshot();
  const status = snapshot.value as Status;
  const context = snapshot.context;
  const send = service.send;

  const focusedValue = context.focusedValue;
  const selectedValue = context.selectedValue;
  const itemMap = context.itemMap;

  const isItemLabelledby = (value: Item["value"]) =>
    itemMap.get(value)?.labelledby ?? true;

  return {
    groupProps: properties.element({
      role: "radiogroup",
    }),
    getRadioProps: (value: Item["value"]) => {
      return properties.button({
        id: dom.getRadioId(context, value),
        type: "button",
        role: "radio",
        "aria-checked": selectedValue === value,
        "aria-labelledby": isItemLabelledby(value)
          ? dom.getLabelId(context, value)
          : undefined,
        onFocus: () => {
          send({ type: "RADIO.FOCUS", value });
        },
        onBlur: () => {
          send({ type: "RADIO.BLUR" });
        },
        onClick: () => {
          send({ type: "RADIO.SELECT", value });
        },
      });
    },
    getLabelProps: (value: Item["value"]) => {
      return properties.label({
        id: dom.getLabelId(context, value),
        htmlFor: isItemLabelledby(value)
          ? dom.getRadioId(context, value)
          : undefined,
      });
    },
    getHiddenInputProps: () => {
      return properties.input({
        type: "radio",
        "aria-hidden": true,
        tabIndex: -1,
        style: {
          position: "absolute",
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          height: "1px",
          width: "1px",
          margin: "-1px",
          padding: 0,
          border: 0,
        },
      });
    },
  };
}
