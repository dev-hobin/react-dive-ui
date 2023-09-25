import { useActor } from "@xstate/react";
import { machine } from "@react-dive-ui/dialog-machine";
import { useId } from "react";

type DialogOptions = {
  id?: string;
  initialOpen?: boolean;
};
export function useDialog(options: DialogOptions = {}) {
  const internalId = useId();
  const [state, send, service] = useActor(machine, {
    input: {
      id: options.id ?? internalId,
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
