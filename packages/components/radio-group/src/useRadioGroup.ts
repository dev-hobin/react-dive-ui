import { machine } from "@react-dive-ui/radio-group-machine";
import { useActor } from "@xstate/react";

export function useRadioGroup() {
  const [state, send, service] = useActor(machine);

  return {
    state: { status: state.value, ...state.context },
    apis: { send },
    service,
  };
}
