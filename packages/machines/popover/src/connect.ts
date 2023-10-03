import { properties } from "@react-dive-ui/properties";
import { Service } from "./types";
import { dom } from "./dom";

export function connect(service: Service) {
  const snapshot = service.getSnapshot();

  const context = snapshot.context;
  const send = service.send;

  return {
    triggerProps: properties.button({
      type: "button",
      id: dom.getTriggerId(context),
      onClick: () => {
        send({ type: "TOGGLE" });
      },
    }),
    panelProps: properties.element({
      id: dom.getPanelId(context),
      style: {
        position: "absolute",
      },
    }),
    closeProps: properties.button({
      type: "button",
      id: dom.getCloseId(context),
      onClick: () => {
        send({ type: "CLOSE" });
      },
    }),
    arrowProps: properties.element({
      id: dom.getArrowId(context),
    }),
  };
}
