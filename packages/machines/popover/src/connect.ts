import { properties } from "@react-dive-ui/properties";
import { Service } from "./types";
import { dom } from "./dom";

export function connect(service: Service) {
  const snapshot = service.getSnapshot();

  const status = snapshot.value;
  const context = snapshot.context;
  const send = service.send;

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
      style: { position: "absolute" },
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
        display: "block",
        position: "absolute",
        "--rotate-deg": "45deg",
        "--arrow-size-x": 0,
        "--arrow-size-y": 0,
        width: "var(--arrow-size-x, 0)",
        height: "var(--arrow-size-y, 0)",
        rotate: "var(--rotate-deg, 0deg)",
        zIndex: -1,
      },
    }),
  };
}
