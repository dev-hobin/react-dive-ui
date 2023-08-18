import { useCallback, useId } from "react";
import { useActor } from "@xstate/react";
import {
  type AccordionItem,
  accordionMachine,
} from "@react-dive-ui/accordion-machine";
import { SingleAccordionOption, MultipleAccordionOption } from "./types";

export type AccordionOption = SingleAccordionOption | MultipleAccordionOption;
export function useAccordion(option?: AccordionOption) {
  const id = useId();

  const [state, send] = useActor(accordionMachine, {
    input:
      option === undefined
        ? { type: "single", id }
        : option.type === "single"
        ? {
            ...option,
            id,
            value: option.defaultValue ? [option.defaultValue] : [],
          }
        : {
            ...option,
            id,
            value: option.defaultValue ?? [],
          },
  });

  console.log(state.context);

  const registerItem = useCallback(
    (item: AccordionItem) => {
      send({ type: "ITEM.REGISTER", item });
    },
    [send]
  );

  const unregisterItem = useCallback(
    (value: string) => {
      send({ type: "ITEM.UNREGISTER", value });
    },
    [send]
  );

  const toggle = useCallback(
    (value: string) => {
      send({ type: "ITEM.TOGGLE", value });
    },
    [send]
  );

  return {
    state: { status: state.value, ...state.context },
    events: { send, toggle, registerItem, unregisterItem },
  } as const;
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>;
