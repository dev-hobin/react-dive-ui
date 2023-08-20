import { useCallback, useId } from "react";
import { useActor } from "@xstate/react";
import { accordionMachine } from "@react-dive-ui/accordion-machine";
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

  const toggle = useCallback(
    (value: string) => {
      send({ type: "ITEM.TOGGLE", value });
    },
    [send]
  );

  const open = useCallback(
    (value: string) => {
      send({ type: "ITEM.OPEN", value });
    },
    [send]
  );

  const close = useCallback(
    (value: string) => {
      send({ type: "ITEM.CLOSE", value });
    },
    [send]
  );

  const setItemDisabled = useCallback(
    (value: string, disabled: boolean) => {
      send({ type: "ITEM.SET.DISABLED", value, disabled });
    },
    [send]
  );

  const setDisabled = useCallback(
    (disabled: boolean) => {
      send({ type: "ROOT.SET.DISABLED", disabled });
    },
    [send]
  );

  return {
    state: { status: state.value, ...state.context },
    events: { _send: send, toggle, open, close, setItemDisabled, setDisabled },
  } as const;
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>;
