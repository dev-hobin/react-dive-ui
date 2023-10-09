import { properties } from "@react-dive-ui/properties";
import { Send, State } from "./types";
import { dom } from "./dom";

export function connect(state: State, send: Send) {
  const context = state.context;
  const status = state.value;

  return {
    triggerProps: properties.button({
      type: "button",
      id: dom.getTriggerId(context),
      onClick: () => {
        send({ type: "TOGGLE" });
      },
      "aria-haspopup": "dialog",
      "aria-expanded": status === "opened",
      "aria-controls": dom.getPanelId(context),
      "data-state": status === "opened" ? "open" : "closed",
    }),
    panelProps: properties.element({
      role: "dialog",
      id: dom.getPanelId(context),
      tabIndex: -1,
      style: {
        position: "absolute",
      },
      "data-state": status === "opened" ? "open" : "closed",
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
    closeProps: properties.button({
      type: "button",
      id: dom.getCloseId(context),
      onClick: () => {
        send({ type: "CLOSE" });
      },
    }),
    arrowProps: properties.element({
      id: dom.getArrowId(context),
      style: {
        display: "inline-block",
        position: "absolute",
      },
    }),
  } as const;
}
