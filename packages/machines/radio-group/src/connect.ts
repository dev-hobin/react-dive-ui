import { properties } from "@react-dive-ui/properties";
import { Item, Service } from "./types";
import { dom } from "./dom";

export function connect(service: Service) {
  const snapshot = service.getSnapshot();
  const context = snapshot.context;
  const send = service.send;

  const selectedValue = context.selectedValue;
  const itemMap = context.itemMap;
  const itemKeys = Array.from(itemMap.keys());

  const isItemLabelledby = (value: Item["value"]) =>
    itemMap.get(value)?.labelledby ?? true;

  const getRadioTabIndex = (value: Item["value"]) => {
    if (selectedValue !== null) {
      return selectedValue === value ? 0 : -1;
    }
    return itemKeys[0] === value ? 0 : -1;
  };

  return {
    groupProps: properties.element({
      role: "radiogroup",
    }),
    getRadioProps: (value: Item["value"]) => {
      return properties.button({
        id: dom.getRadioId(context, value),
        type: "button",
        role: "radio",
        tabIndex: getRadioTabIndex(value),
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
        onKeyDown: (ev) => {
          if (ev.key === "ArrowRight" || ev.key === "ArrowDown") {
            send({ type: "RADIO.SELECT.NEXT" });
          } else if (ev.key === "ArrowUp" || ev.key === "ArrowLeft") {
            send({ type: "RADIO.SELECT.PREV" });
          }
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
