import {
  Item,
  Orientation,
  connect,
  machine,
} from "@react-dive-ui/radio-group-machine";
import { useActor } from "@xstate/react";
import { useId } from "react";

export type RadioGroupOptions = {
  id?: string;
  defaultValue?: Item["value"];
  orientation?: Orientation;
  disabled?: boolean;
};
export function useRadioGroup(options: RadioGroupOptions = {}) {
  const internalId = useId();
  const [state, send] = useActor(machine, {
    input: {
      id: options.id ?? internalId,
      selectedValue: options.defaultValue,
      orientation: options.orientation,
      disabled: options.disabled,
    },
  });

  console.log("---------");
  console.log("status", state.value);
  console.log("context", state.context);

  return {
    state: { status: state.value, ...state.context },
    apis: { send },
    props: connect(state, send),
  };
}
