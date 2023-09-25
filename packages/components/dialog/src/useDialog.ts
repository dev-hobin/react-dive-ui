import { useActor } from "@xstate/react";
import { machine } from "@react-dive-ui/dialog-machine";

export function useDialog() {
  const [state, send, service] = useActor(machine);

  return {
    state: { status: state.value },
    apis: { send },
    service,
  };
}
