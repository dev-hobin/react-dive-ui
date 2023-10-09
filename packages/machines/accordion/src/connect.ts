import { properties } from "@react-dive-ui/properties";
import { dom } from "./dom";

import type { Item, Send, State } from "./types";

const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

type ItemProp = Omit<Item, "disabled"> & Partial<Pick<Item, "disabled">>;

export type ConnectReturn = {
  rootProps: ReturnType<typeof properties.element>;
  getTriggerProps: (props: ItemProp) => ReturnType<typeof properties.button>;
  getHeadingProps: (props: ItemProp) => ReturnType<typeof properties.h3>;
  getPanelProps: (props: ItemProp) => ReturnType<typeof properties.element>;
};
export function connect(state: State, send: Send): ConnectReturn {
  const context = state.context;

  return {
    rootProps: properties.element({
      id: dom.getRootId(context),
      "data-orientation": context.orientation,
    }),
    getTriggerProps: ({ value, disabled = false }) => {
      return properties.button({
        id: dom.getTriggerId(context, value),
        type: "button",
        disabled,
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
        onClick: () => {
          send({ type: "ITEM.TOGGLE", value });
        },
        "data-state": context.expandedValues.includes(value)
          ? "open"
          : "closed",
        "data-orientation": context.orientation,
        "data-disabled": disabled ? "" : undefined,
        "data-ownedby": dom.getRootId(context),
      });
    },
    getHeadingProps: ({ value, disabled = false }) => {
      return properties.h3({
        id: dom.getHeadingId(context, value),
        "data-state": context.expandedValues.includes(value)
          ? "open"
          : "closed",
        "data-orientation": context.orientation,
        "data-disabled": disabled ? "" : undefined,
      });
    },
    getPanelProps: ({ value, disabled = false }) => {
      return properties.element({
        id: dom.getPanelId(context, value),
        "data-state": context.expandedValues.includes(value)
          ? "open"
          : "closed",
        "data-orientation": context.orientation,
        "data-disabled": disabled ? "" : undefined,
      });
    },
  };
}
