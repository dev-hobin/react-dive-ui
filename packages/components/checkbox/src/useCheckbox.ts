import { machine } from "@react-dive-ui/checkbox-machine";
import { useActor } from "@xstate/react";
import { useCallback } from "react";

export function useCheckbox() {
  const [state, send, actorRef] = useActor(machine);

  const check = useCallback(() => {
    send({ type: "CHECK" });
  }, [send]);

  const setChecked = useCallback(
    (checked: boolean) => {
      send({ type: "SET.CHECKED", checked });
    },
    [send]
  );

  const setIndeterminate = useCallback(() => {
    send({ type: "SET.INDETERMINATE" });
  }, [send]);

  const setDisabled = useCallback(
    (disabled: boolean) => {
      send({ type: "SET.DISABLED", disabled });
    },
    [send]
  );

  const { value, context } = state;
  return {
    state: {
      status: value,
      ...context,
    },
    apis: { check, setChecked, setIndeterminate, setDisabled },
    service: actorRef,
  };
}
