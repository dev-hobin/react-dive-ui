import { properties } from "@react-dive-ui/properties";
import { MachineSend, MachineState } from "./types";
import { dom } from "./dom";

export function connect(state: MachineState, send: MachineSend) {
  const { context } = state;

  const activeValue = context.value;

  return {
    rootProps: properties.element({
      id: dom.getRootId(context),
      "data-part": "root",
      "data-orientation": context.orientation,
    }),
    listProps: properties.element({
      id: dom.getListId(context),
      role: "tablist",
      "data-part": "list",
      "data-orientation": context.orientation,
    }),
    getTriggerProps(value: string, disabled?: boolean) {
      return properties.button({
        id: dom.getTriggerId(context, value),
        type: "button",
        role: "tab",
        disabled,
        tabIndex: activeValue === value || activeValue === null ? 0 : -1,

        onClick() {
          send({ type: "TRIGGER.ACTIVATE", value });
        },
        onFocus() {
          send({ type: "TRIGGER.FOCUS", value });
        },
        onBlur() {
          send({ type: "TRIGGER.BLUR" });
        },
        onKeyDown(ev) {
          if (!ev.shiftKey && ev.key === "Tab" && activeValue === value) {
            ev.preventDefault();
            send({ type: "PANEL.FOCUS.CURRENT" });
            return;
          }

          if (ev.key === "Home") {
            send({ type: "TRIGGER.FOCUS.FIRST" });
          } else if (ev.key === "End") {
            send({ type: "TRIGGER.FOCUS.LAST" });
          } else if (context.orientation === "vertical") {
            if (ev.key === "ArrowUp") {
              send({ type: "TRIGGER.FOCUS.PREV" });
            } else if (ev.key === "ArrowDown") {
              send({ type: "TRIGGER.FOCUS.NEXT" });
            }
          } else {
            if (ev.key === "ArrowRight") {
              send({ type: "TRIGGER.FOCUS.NEXT" });
            } else if (ev.key === "ArrowLeft") {
              send({ type: "TRIGGER.FOCUS.PREV" });
            }
          }
        },

        "aria-selected": activeValue === value,
        "aria-controls": dom.getPanelId(context, value),
        "data-part": "trigger",
        "data-orientation": context.orientation,
        "data-disabled": disabled ? "" : undefined,
        "data-state": activeValue === value ? "active" : "inactive",
      });
    },
    getPanelProps(value: string) {
      return properties.element({
        id: dom.getPanelId(context, value),
        role: "tabpanel",
        tabIndex: 0,
        "aria-labelledby": dom.getTriggerId(context, value),
        "data-part": "panel",
        "data-orientation": context.orientation,
        "data-state": activeValue === value ? "active" : "inactive",
      });
    },
  };
}
