import { createIdFactory } from "@react-dive-ui/tabs-machine";
import type { DivePropsWithoutRef } from "@react-dive-ui/dive";
import type { UseTabsReturn } from "./useTabs";
import { useMemo } from "react";

const ARROW_KEYS = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];

export type TabsProps = {
  rootProps: DivePropsWithoutRef<"div">;
  listProps: DivePropsWithoutRef<"div">;
  getTriggerProps: (value: string) => DivePropsWithoutRef<"button">;
  getContentProps: (value: string) => DivePropsWithoutRef<"div">;
};
export function useTabsProps(logic: UseTabsReturn): TabsProps {
  const tabs = logic;
  const idFactory = useMemo(
    () => createIdFactory(tabs.state.id),
    [tabs.state.id]
  );

  const state = tabs.state;
  const events = tabs.events;

  const orientation = state.orientation;
  const currentActiveValue = state.value;
  const checkIsDisabled = (value: string) =>
    state.disabledValues.includes(value);

  const checkIsActive = (value: string) => value === currentActiveValue;

  return {
    rootProps: {
      id: idFactory.createRootId(),
      "data-part": "root",
      "data-orientation": orientation,
    },
    listProps: {
      role: "tablist",
      "data-part": "list",
      "data-orientation": orientation,
    },
    getTriggerProps: (value: string) => {
      return {
        id: idFactory.createTriggerId(value),
        type: "button",
        role: "tab",
        tabIndex: checkIsActive(value) ? undefined : -1,
        disabled: checkIsDisabled(value),
        "aria-selected": checkIsActive(value),
        "aria-controls": idFactory.createContentId(value),
        "data-part": "trigger",
        "data-value": value,
        "data-orientation": orientation,
        "data-disabled": checkIsDisabled(value) ? "" : undefined,
        "data-state": checkIsActive(value) ? "active" : "inactive",
        onClick: () => {
          events.activateTab(value);
        },
        onFocus: () => {
          events._send({ type: "TAB.FOCUS", value });
        },
        onBlur: () => {
          events._send({ type: "TAB.BLUR" });
        },
        onKeyDown: (ev) => {
          if (!ARROW_KEYS.includes(ev.key)) return;
          switch (ev.key) {
            case "ArrowUp": {
              if (orientation === "vertical") {
                events._send({ type: "TAB.PREVIOUS" });
              }
              break;
            }
            case "ArrowLeft": {
              if (orientation === "horizontal") {
                events._send({ type: "TAB.PREVIOUS" });
              }
              break;
            }
            case "ArrowDown": {
              if (orientation === "vertical") {
                events._send({ type: "TAB.NEXT" });
              }
              break;
            }
            case "ArrowRight": {
              if (orientation === "horizontal") {
                events._send({ type: "TAB.NEXT" });
              }
              break;
            }
          }
        },
      };
    },
    getContentProps: (value: string) => {
      return {
        id: idFactory.createContentId(value),
        role: "tabpanel",
        tabIndex: 0,
        "aria-labelledby": idFactory.createTriggerId(value),
        "data-part": "content",
        "data-value": value,
        "data-orientation": orientation,
        "data-state": checkIsActive(value) ? "active" : "inactive",
      };
    },
  };
}
