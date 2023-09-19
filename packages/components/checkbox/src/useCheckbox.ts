import { useCallback, useId } from "react";
import { useActor } from "@xstate/react";
import { machine } from "@react-dive-ui/checkbox-machine";

export function useCheckbox() {
  const internalId = useId();
  const [state, send, actorRef] = useActor(machine, {
    input: {
      id: internalId,
      checkedState: "unchecked",
      disabled: false,
      form: { name: "test", required: true },
    },
  });

  console.log("----------");
  console.log(state.context);

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
