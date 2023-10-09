import { properties } from "@react-dive-ui/properties";
import { dom } from "./dom";

import type { Send, State, ItemProp } from "./types";

const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

export function connect(state: State, send: Send) {
  const context = state.context;

  return {
    rootProps: properties.element({
      id: dom.getRootId(context),
      "data-orientation": context.orientation,
    }),
    listProps: properties.element({
      id: dom.getListId(context),
      role: "tablist",
      "aria-orientation": context.orientation,
      "data-orientation": context.orientation,
    }),
    getTriggerProps: ({ value, disabled = false }: ItemProp) => {
      return properties.button({
        id: dom.getTriggerId(context, value),
        type: "button",
        role: "tab",
        disabled: disabled,
        tabIndex: context.value === value ? 0 : -1,
        "data-ownedby": dom.getRootId(context),
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
          send({ type: "ITEM.ACTIVATE", value });
        },
        "aria-controls": dom.getPanelId(context, value),
        "aria-selected": context.value === value,
        "data-state": context.value === value ? "active" : "inactive",
        "data-orientation": context.orientation,
        "data-disabled": disabled ? "" : undefined,
      });
    },
    getPanelProps: (value: ItemProp["value"]) => {
      return properties.element({
        id: dom.getPanelId(context, value),
        role: "tabpanel",
        tabIndex: context.value === value ? 0 : -1,
        "aria-labelledby": dom.getTriggerId(context, value),
        "data-state": context.value === value ? "active" : "inactive",
        "data-orientation": context.orientation,
      });
    },
  } as const;
}
