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
      id: dom.getTriggerId(context),
      onClick: () => {
        send({ type: "OPEN" });
      },
      "data-state": context.open ? "open" : "closed",
    }),
    closeProps: properties.button({
      type: "button",
      onClick: () => {
        send({ type: "CLOSE" });
      },
    }),
    backdropProps: properties.element({
      "aria-hidden": true,
      "data-state": context.open ? "open" : "closed",
    }),
    panelProps: properties.element({
      role: "dialog",
      tabIndex: -1,
      id: dom.getPanelId(context),
      "aria-modal": context.type === "modal",
      "data-state": context.open ? "open" : "closed",
    }),
    title: properties.h2({
      id: dom.getTriggerId(context),
    }),
    description: properties.p({
      id: dom.getDescriptionId(context),
    }),
  };
}
