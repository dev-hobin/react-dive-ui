import { useCallback, useId } from "react";
import { useActor } from "@xstate/react";
import { tabsMachine } from "@react-dive-ui/tabs-machine";

export type TabsOption = {
  defaultValue: string;
  orientation?: "horizontal" | "vertical";
  activationMode?: "automatic" | "manual";
  disabledValues?: string[];
};
export function useTabs(option: TabsOption) {
  const id = useId();
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

  const setTabDisabled = useCallback(
    (value: string, disabled: boolean) => {
      send({ type: "TAB.SET.DISABLED", value, disabled });
    },
    [send]
  );

  return {
    state: { status: state.value, ...state.context },
    events: { _send: send, activateTab, setTabDisabled },
  } as const;
}

export type UseTabsReturn = ReturnType<typeof useTabs>;
