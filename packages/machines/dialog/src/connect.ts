import { properties } from "@react-dive-ui/properties";
import { dom } from "./dom";

import type { Send, State } from "./types";

export function connect(state: State, send: Send) {
  const context = state.context;

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
      "aria-labelledby": context.metaElements.title
        ? dom.getTitleId(context)
        : undefined,
      "aria-describedby": context.metaElements.description
        ? dom.getDescriptionId(context)
        : undefined,
    }),
    titleProps: properties.h2({
      id: dom.getTitleId(context),
    }),
    descriptionProps: properties.p({
      id: dom.getDescriptionId(context),
    }),
  };
}
