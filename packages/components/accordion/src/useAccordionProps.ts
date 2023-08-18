import { DivePropsWithoutRef } from "@react-dive-ui/dive";
import { UseAccordionReturn } from "./useAccordion";

export type AccordionProps = {
  rootProps: DivePropsWithoutRef<"div">;
  getItemProps: (value: string | number) => DivePropsWithoutRef<"div">;
  getTriggerProps: (value: string | number) => DivePropsWithoutRef<"button">;
  headingProps: DivePropsWithoutRef<"h3">;
  contentProps: DivePropsWithoutRef<"div">;
};
export function useAccordionProps(logic: UseAccordionReturn): AccordionProps {
  const accordion = logic;

  return {
    rootProps: {
      "data-part": "root",
    },
    getItemProps: (value) => {
      return {
        "data-part": "item",
      };
    },
    getTriggerProps: (value) => {
      return {
        "data-part": "trigger",
      };
    },
    headingProps: {
      "data-part": "heading",
    },
    contentProps: {
      "data-part": "content",
    },
  };
}
