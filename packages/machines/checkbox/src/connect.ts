import { properties } from "@react-dive-ui/properties";
import { Service } from "./types";
import { dom } from "./dom";

export function connect(service: Service) {
  const snapshot = service.getSnapshot();
  const context = snapshot.context;

  return {
    getControlProps: (value: string) =>
      properties.button({
        id: dom.getControlId(context, value),
      }),
    getLabelProps: (value: string) =>
      properties.label({
        id: dom.getLabelId(context, value),
      }),
    getHiddenInputProps: (value: string) =>
      properties.input({
        id: dom.getHiddenInputId(context, value),
      }),
  };
}
