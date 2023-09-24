import { properties } from "@react-dive-ui/properties";
import { Item, Service } from "./types";
import { dom } from "./dom";

const ARROW_KEYS = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

export function connect(service: Service) {
  const snapshot = service.getSnapshot();
  const context = snapshot.context;
  const send = service.send;

  const selectedValue = context.selectedValue;
  const itemMap = context.itemMap;
  const itemArr = Array.from(itemMap.values());

  const groupDisabled = context.disabled;

  const isItemLabelledby = (value: Item["value"]) =>
    itemMap.get(value)?.labelledby ?? true;

  const isItemDisabled = (value: Item["value"]) =>
    !!itemMap.get(value)?.disabled;

  const getRadioTabIndex = (value: Item["value"]) => {
    if (groupDisabled || isItemDisabled(value)) {
      return -1;
    }

    const enabledItems = itemArr.filter((item) => !item.disabled);
    if (selectedValue !== null) {
      if (isItemDisabled(selectedValue)) {
        return enabledItems[0].value === value ? 0 : -1;
      }
      return selectedValue === value ? 0 : -1;
    }

    return enabledItems[0].value === value ? 0 : -1;
  };

  return {
    groupProps: properties.element({
      role: "radiogroup",
      "data-disabled": groupDisabled ? "" : undefined,
    }),
    getRadioProps: (value: Item["value"]) => {
      return properties.button({
        id: dom.getRadioId(context, value),
        type: "button",
        role: "radio",
        tabIndex: getRadioTabIndex(value),
        disabled: groupDisabled || isItemDisabled(value),
        "aria-checked": selectedValue === value,
        "aria-labelledby": isItemLabelledby(value)
          ? dom.getLabelId(context, value)
          : undefined,
        "data-disabled":
          groupDisabled || isItemDisabled(value) ? "" : undefined,
        "data-state": selectedValue === value ? "checked" : "unchecked",
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
          if (ARROW_KEYS.includes(ev.key)) {
            ev.preventDefault();
          }

          if (context.orientation === "vertical") {
            if (ev.key === "ArrowDown") {
              send({ type: "RADIO.SELECT.NEXT" });
            } else if (ev.key === "ArrowUp") {
              send({ type: "RADIO.SELECT.PREV" });
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
    getLabelProps: (value: Item["value"]) => {
      return properties.label({
        id: dom.getLabelId(context, value),
        htmlFor: isItemLabelledby(value)
          ? dom.getRadioId(context, value)
          : undefined,
        "data-disabled":
          groupDisabled || isItemDisabled(value) ? "" : undefined,
        "data-state": selectedValue === value ? "checked" : "unchecked",
      });
    },
    getHiddenInputProps: (value: Item["value"]) => {
      return properties.input({
        type: "radio",
        "aria-hidden": true,
        tabIndex: -1,
        "data-disabled":
          groupDisabled || isItemDisabled(value) ? "" : undefined,
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
