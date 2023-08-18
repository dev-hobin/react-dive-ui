import { DivePropsWithoutRef } from "@react-dive-ui/dive";
import { UseAccordionReturn } from "./useAccordion";

export type AccordionProps = {
  rootProps: DivePropsWithoutRef<"div">;
  getItemProps: (value: string) => DivePropsWithoutRef<"div">;
  getTriggerProps: (value: string) => DivePropsWithoutRef<"button">;
  getHeadingProps: (value: string) => DivePropsWithoutRef<"h3">;
  getContentProps: (value: string) => DivePropsWithoutRef<"div">;
};
export function useAccordionProps(logic: UseAccordionReturn): AccordionProps {
  const accordion = logic;

  const state = accordion.state;
  const events = accordion.events;

  const currentOpenValues = state.value;
  const itemMap = state.itemMap;

  const orientation = state.orientation;
  const collapsible = state.collapsible;
  const isAllDisabled = state.disabled;

  const checkIsItemDisabled = (value: string) =>
    isAllDisabled || itemMap[value]?.["isDisabled"];

  return {
    rootProps: {
      "data-part": "root",
      "data-orientation": orientation,
    },
    getItemProps: (value) => {
      return {
        "data-part": "item",
        "data-orientation": orientation,
        "data-state": currentOpenValues.includes(value) ? "open" : "close",
        "data-disabled": checkIsItemDisabled(value) ? "" : undefined,
      };
    },
    getTriggerProps: (value) => {
      return {
        "data-part": "trigger",
        "data-orientation": orientation,
        "data-state": currentOpenValues.includes(value) ? "open" : "close",
        "data-disabled": checkIsItemDisabled(value) ? "" : undefined,
        onClick: () => {
          events.toggle(value);
        },
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
      };
    },
  };
}
