import { properties } from "@react-dive-ui/properties";
import { Item, State, Send } from "./types";
import { dom } from "./dom";

const ARROW_KEYS = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

type ItemProp = Omit<Item, "disabled"> & Partial<Pick<Item, "disabled">>;

export function connect(state: State, send: Send) {
  const context = state.context;

  const selectedValue = context.selectedValue;

  const groupDisabled = context.disabled;

  const getRadioTabIndex = ({ value, disabled = false }: ItemProp) => {
    if (groupDisabled || disabled) {
      return -1;
    }
    if (selectedValue !== null) {
      return selectedValue === value ? 0 : -1;
    }
    return 0;
  };

  return {
    groupProps: properties.element({
      id: dom.getGroupId(context),
      role: "radiogroup",
      "data-disabled": groupDisabled ? "" : undefined,
    }),
    getRadioProps: ({ value, disabled = false }: ItemProp) => {
      return properties.button({
        id: dom.getRadioId(context, value),
        type: "button",
        role: "radio",
        tabIndex: getRadioTabIndex({ value, disabled }),
        disabled: groupDisabled || disabled,
        "aria-checked": selectedValue === value,
        "aria-labelledby": dom.getLabelId(context, value),
        "data-disabled": groupDisabled || disabled ? "" : undefined,
        "data-state": selectedValue === value ? "checked" : "unchecked",
        "data-ownedby": dom.getGroupId(context),
        "data-value": value,
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
    getIndicatorProps: ({ value, disabled = false }: ItemProp) => {
      return properties.element({
        id: dom.getRadioId(context, value),
        tabIndex: -1,
        "data-disabled": groupDisabled || disabled ? "" : undefined,
        "data-state": selectedValue === value ? "checked" : "unchecked",
      });
    },
    getLabelProps: ({ value, disabled = false }: ItemProp) => {
      return properties.label({
        id: dom.getLabelId(context, value),
        htmlFor: dom.getRadioId(context, value),
        "data-disabled": groupDisabled || disabled ? "" : undefined,
        "data-state": selectedValue === value ? "checked" : "unchecked",
      });
    },
    getHiddenInputProps: ({ value, disabled = false }: ItemProp) => {
      return properties.input({
        id: dom.getHiddenInputId(context, value),
        type: "radio",
        "aria-hidden": true,
        tabIndex: -1,
        value: value,
        "data-disabled": groupDisabled || disabled ? "" : undefined,
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
  } as const;
}
