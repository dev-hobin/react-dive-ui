import { useCallback, useId } from "react";
import { useActor } from "@xstate/react";
import { tabsMachine } from "@react-dive-ui/tabs-machine";

export type TabsOption = {
  defaultValue: string;
  id?: string;
  orientation?: "horizontal" | "vertical";
  activationMode?: "automatic" | "manual";
};
export function useTabs(option: TabsOption) {
  const id = option.id ?? useId();
  const { defaultValue, ...restOptions } = option;
  const [state, send] = useActor(tabsMachine, {
    input: {
      id: id,
      value: defaultValue,
      ...restOptions,
    },
  });

  console.log(state.context);

  const activateTab = useCallback(
    (value: string) => {
      send({ type: "TAB.ACTIVATE", value });
    },
    [send]
  );

  return {
    state: { status: state.value, ...state.context },
    events: { _send: send, activateTab },
  } as const;
}

export type UseTabsReturn = ReturnType<typeof useTabs>;
