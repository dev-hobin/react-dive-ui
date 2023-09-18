import { ActorRefFrom } from "xstate";
import { properties } from "@react-dive-ui/properties";
import { machine } from "./machine";
import { dom } from "./dom";

import type { Item } from "./types";

const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

export function connect(service: ActorRefFrom<typeof machine>) {
  const snapshot = service.getSnapshot();
  const context = snapshot.context;
  const send = service.send;

  return {
    rootProps: properties.element({
      id: dom.getRootId(context),
      "data-orientation": context.orientation,
    }),
    getTriggerProps: (value: Item["value"]) => {
      return properties.button({
        id: dom.getTriggerId(context, value),
        type: "button",
        onFocus: () => {
          send({ type: "TRIGGER.FOCUSED", value });
        },
        onBlur: () => {
          send({ type: "TRIGGER.BLURRED" });
        },
        onKeyDown: (ev) => {
          if (ARROW_KEYS.includes(ev.key)) {
            ev.preventDefault();
          }

          if (context.orientation === "horizontal") {
            if (ev.key === "ArrowRight") {
              send({ type: "TRIGGER.FOCUS.NEXT" });
            } else if (ev.key === "ArrowLeft") {
              send({ type: "TRIGGER.FOCUS.PREV" });
            }
          } else if (context.orientation === "vertical") {
            if (ev.key === "ArrowDown") {
              send({ type: "TRIGGER.FOCUS.NEXT" });
            } else if (ev.key === "ArrowUp") {
              send({ type: "TRIGGER.FOCUS.PREV" });
            }
          }
        },
        "data-state": context.expandedValues.includes(value)
          ? "open"
          : "closed",
        "data-orientation": context.orientation,
        "data-disabled": context.itemMap.get(value)?.disabled ? "" : undefined,
      });
    },
    getHeadingProps: (value: Item["value"]) => {
      return properties.h3({
        id: dom.getHeadingId(context, value),
        "data-state": context.expandedValues.includes(value)
          ? "open"
          : "closed",
        "data-orientation": context.orientation,
        "data-disabled": context.itemMap.get(value)?.disabled ? "" : undefined,
      });
    },
    getPanelProps: (value: Item["value"]) => {
      return properties.element({
        id: dom.getPanelId(context, value),
        "data-state": context.expandedValues.includes(value)
          ? "open"
          : "closed",
        "data-orientation": context.orientation,
        "data-disabled": context.itemMap.get(value)?.disabled ? "" : undefined,
      });
    },
  };
}
