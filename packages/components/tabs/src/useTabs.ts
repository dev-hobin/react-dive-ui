import { machine } from "@react-dive-ui/tabs-machine";
import { useActor } from "@xstate/react";

export function useTabs() {
  const [state, send] = useActor(machine);

  const { value, context } = state;
  return {
    state: { status: value, ...context },
    apis: {},
  };
}
