import {
  Item,
  Orientation,
  ConnectReturn,
  Status,
  connect,
  machine,
  Context,
} from "@react-dive-ui/radio-group-machine";
import { useActor } from "@xstate/react";
import { useCallback, useId } from "react";

export type RadioGroupOptions = {
  id?: string;
  defaultValue?: Item["value"];
  orientation?: Orientation;
  disabled?: boolean;
};

type UseRadioGroupReturn = {
  state: {
    status: Status;
  } & Context;
  apis: {
    select: (value: Item["value"]) => void;
  };
  props: ConnectReturn;
};
export function useRadioGroup(
  options: RadioGroupOptions = {}
): UseRadioGroupReturn {
  const internalId = useId();
  const [state, send] = useActor(machine, {
    input: {
      id: options.id ?? internalId,
      selectedValue: options.defaultValue,
      orientation: options.orientation,
      disabled: options.disabled,
    },
  });

  const select = useCallback(
    (value: Item["value"]) => {
      send({ type: "RADIO.SELECT", value });
    },
    [send]
  );

  console.log("---------");
  console.log("status", state.value);
  console.log("context", state.context);

  return {
    state: { status: state.value as Status, ...state.context },
    apis: { select },
    props: connect(state, send),
  };
}
