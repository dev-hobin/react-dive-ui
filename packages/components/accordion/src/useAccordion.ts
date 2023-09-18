import { useActor } from "@xstate/react";
import { machine } from "@react-dive-ui/accordion-machine";
import { useCallback } from "react";

export function useAccordion() {
  const [state, send, actorRef] = useActor(machine, {
    input: {
      id: "id",
      type: "single",
      collapsible: true,
      orientation: "vertical",
      expandedValues: [],
      itemMap: new Map([
        ["value-1", { value: "value-1", disabled: false }],
        ["value-2", { value: "value-2", disabled: false }],
        ["value-3", { value: "value-3", disabled: false }],
      ]),
    },
  });

  const toggle = useCallback(
    (value: string) => {
      send({ type: "ITEM.TOGGLE", value });
    },
    [send]
  );
  const open = useCallback(
    (value: string) => {
      send({ type: "ITEM.EXPAND", value });
    },
    [send]
  );
  const close = useCallback(
    (value: string) => {
      send({ type: "ITEM.COLLAPSE", value });
    },
    [send]
  );

  const { value, context } = state;
  return {
    state: { status: value, ...context },
    apis: { toggle, open, close },
    service: actorRef,
  };
}
