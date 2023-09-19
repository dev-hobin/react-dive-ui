import { properties } from "@react-dive-ui/properties";
import { Service } from "./types";
import { dom } from "./dom";

export function connect(service: Service) {
  const snapshot = service.getSnapshot();
  const context = snapshot.context;

  return {
    controlProps: properties.button({
      id: dom.getControlId(context),
    }),
    labelProps: properties.label({
      id: dom.getLabelId(context),
    }),
    hiddenInputProps: properties.input({
      id: dom.getHiddenInputId(context),
    }),
  };
}
