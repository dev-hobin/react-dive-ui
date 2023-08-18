import { DivePropsWithoutRef } from "@react-dive-ui/dive";
import { createIdFactory } from "@react-dive-ui/accordion-machine";
import { useMemo } from "react";
import { UseAccordionReturn } from "./useAccordion";

const ARROW_KEYS = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];

export type AccordionProps = {
  rootProps: DivePropsWithoutRef<"div">;
  getItemProps: (value: string) => DivePropsWithoutRef<"div">;
  getTriggerProps: (value: string) => DivePropsWithoutRef<"button">;
  getHeadingProps: (value: string) => DivePropsWithoutRef<"h3">;
  getContentProps: (value: string) => DivePropsWithoutRef<"div">;
};
export function useAccordionProps(logic: UseAccordionReturn): AccordionProps {
  const accordion = logic;
  const idFactory = useMemo(
    () => createIdFactory(accordion.state.id),
    [accordion.state.id]
  );

  const state = accordion.state;
  const events = accordion.events;

  const currentOpenValues = state.value;
  const currentFocusedValue = state.focusedItemValue;
  const itemMap = state.itemMap;

  const orientation = state.orientation;
  const collapsible = state.collapsible;
  const isAllDisabled = state.disabled;

  const checkIsItemDisabled = (value: string) =>
    isAllDisabled || itemMap[value]?.["isDisabled"];
  const checkIsItemOpen = (value: string) => currentOpenValues.includes(value);

  return {
    rootProps: {
      id: idFactory.createRootId(),
      "data-part": "root",
      "data-orientation": orientation,
    },
    getItemProps: (value) => {
      return {
        "data-part": "item",
        "data-orientation": orientation,
        "data-state": checkIsItemOpen(value) ? "open" : "close",
        "data-disabled": checkIsItemDisabled(value) ? "" : undefined,
      };
    },
    getTriggerProps: (value) => {
      return {
        id: idFactory.createTriggerId(value),
        disabled: checkIsItemDisabled(value),
        onClick: () => {
          events.toggle(value);
        },
        onFocus: () => {
          events._send({ type: "TRIGGER.FOCUS", value });
        },
        onBlur: () => {
          events._send({ type: "TRIGGER.BLUR" });
        },
        onKeyDown: (ev) => {
          if (!ARROW_KEYS.includes(ev.key)) return;
          switch (ev.key) {
            case "ArrowUp": {
              if (orientation === "vertical") {
                events._send({ type: "FOCUS.PREVIOUS" });
              }
              break;
            }
            case "ArrowLeft": {
              if (orientation === "horizontal") {
                events._send({ type: "FOCUS.PREVIOUS" });
              }
              break;
            }
            case "ArrowDown": {
              if (orientation === "vertical") {
                events._send({ type: "FOCUS.NEXT" });
              }
              break;
            }
            case "ArrowRight": {
              if (orientation === "horizontal") {
                events._send({ type: "FOCUS.NEXT" });
              }
              break;
            }
          }
        },
        "data-part": "trigger",
        "data-orientation": orientation,
        "data-state": checkIsItemOpen(value) ? "open" : "close",
        "data-disabled": checkIsItemDisabled(value) ? "" : undefined,
        "data-focused": currentFocusedValue === value ? "" : undefined,
        "aria-expanded": checkIsItemOpen(value) ? true : false,
        "aria-controls": idFactory.createContentId(value),
        "aria-disabled": checkIsItemOpen(value) && !collapsible ? true : false,
      };
    },
    getHeadingProps: (value) => {
      return {
        "data-part": "heading",
        "data-orientation": orientation,
        "data-state": currentOpenValues.includes(value) ? "open" : "close",
        "data-disabled": checkIsItemDisabled(value) ? "" : undefined,
      };
    },
    getContentProps: (value) => {
      return {
        "data-part": "content",
        "data-orientation": orientation,
        "data-state": currentOpenValues.includes(value) ? "open" : "close",
        "data-disabled": checkIsItemDisabled(value) ? "" : undefined,
        "aria-labelledby": idFactory.createTriggerId(value),
      };
    },
  };
}
