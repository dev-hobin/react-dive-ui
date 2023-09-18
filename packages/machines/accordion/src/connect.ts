import { ActorRefFrom } from "xstate";
import { properties } from "@react-dive-ui/properties";
import { machine } from "./machine";
import { dom } from "./dom";

import type { Item } from "./types";

export function connect(service: ActorRefFrom<typeof machine>) {
  const snapshot = service.getSnapshot();
  const context = snapshot.context;
  const send = service.send;

  return {
    rootProps: properties.element({
      id: dom.getRootId(context),
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
      });
    },
    getHeadingProps: (value: Item["value"]) => {
      return properties.h3({
        id: dom.getHeadingId(context, value),
      });
    },
    getPanelProps: (value: Item["value"]) => {
      return properties.element({
        id: dom.getPanelId(context, value),
      });
    },
  };
}
