import { properties } from "@react-dive-ui/properties";

import type { Service } from "./types";
import { dom } from "./dom";

export function connect(service: Service) {
  const snapshot = service.getSnapshot();

  const context = snapshot.context;
  const send = service.send;

  return {
    triggerProps: properties.button({
      type: "button",
      onClick: () => {
        send({ type: "OPEN" });
      },
    }),
    closeProps: properties.button({
      type: "button",
      onClick: () => {
        send({ type: "CLOSE" });
      },
    }),
    panelProps: properties.div({
      id: dom.getPanelId(context),
    }),
  };
}
