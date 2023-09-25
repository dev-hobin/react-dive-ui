import { useActor } from "@xstate/react";
import { machine } from "@react-dive-ui/dialog-machine";

type DialogOptions = {
  initialOpen?: boolean;
};
export function useDialog(options: DialogOptions = {}) {
  const [state, send, service] = useActor(machine, {
    input: {
      open: options.initialOpen ?? false,
    },
  });

  console.log("state", state);

  return {
    state: { status: state.value, ...state.context },
    apis: { send },
    service,
  };
}
