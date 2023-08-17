import { useCallback } from "react";
import { useActor } from "@xstate/react";
import { accordionMachine } from "@react-dive-ui/accordion-machine";
import { SingleAccordionOption, MultipleAccordionOption } from "./types";

const defaultOption: SingleAccordionOption = {
  type: "single",
};

export type AccordionOption = SingleAccordionOption | MultipleAccordionOption;
export function useAccordion(option?: AccordionOption) {
  const [state, send] = useActor(accordionMachine, {
    input:
      option === undefined
        ? defaultOption
        : option.type === "single"
        ? {
            ...option,
            value: option.defaultValue ? [option.defaultValue] : [],
          }
        : {
            ...option,
            value: option.defaultValue ?? [],
          },
  });

  const toggle = useCallback((value: string) => {
    send({ type: "ITEM.TOGGLE", value });
  }, []);

  return {
    state: { status: state.value, ...state.context },
    events: { send, toggle },
  } as const;
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>;
