import { useCallback } from "react";
import { useActor } from "@xstate/react";
import { accordionMachine } from "@react-dive-ui/accordion-machine";
import { MultipleAccordion, SingleAccordion } from "./types";

export type AccordionOption = MultipleAccordion | SingleAccordion;
export function useAccordion(option: AccordionOption) {
  const [state, send] = useActor(accordionMachine, {
    input:
      option.type === "single"
        ? {
            ...option,
            values: option.defaultValue ? [option.defaultValue] : [],
          }
        : {
            ...option,
            values: option.defaultValue ?? [],
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
