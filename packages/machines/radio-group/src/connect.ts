import { properties } from "@react-dive-ui/properties";
import { Item, Service, Status } from "./types";

export function connect(service: Service) {
  const snapshot = service.getSnapshot();
  const status = snapshot.value as Status;
  const context = snapshot.context;
  const send = service.send;

  return {
    groupProps: properties.element({
      role: "radiogroup",
    }),
    getRadioProps: (value: Item["value"]) => {
      return properties.button({
        type: "button",
        role: "radio",
        onFocus: () => {
          send({ type: "RADIO.FOCUS", value: value });
        },
        onBlur: () => {
          send({ type: "RADIO.BLUR" });
        },
      });
    },
    getLabelProps: () => {
      return properties.label({});
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
