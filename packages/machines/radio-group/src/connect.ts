import { properties } from "@react-dive-ui/properties";
import { Service, Status } from "./types";

export function connect(service: Service) {
  const snapshot = service.getSnapshot();
  const status = snapshot.value as Status;
  const context = snapshot.context;

  return {
    groupProps: properties.element({
      role: "radiogroup",
    }),
    getRadioProps: () => {
      return properties.button({
        type: "button",
        role: "radio",
      });
    },
    getLabelProps: () => {
      return properties.label({});
    },
    getHiddenInputProps: () => {
      return properties.input({
        type: "radio",
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
