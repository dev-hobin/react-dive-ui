import {
  machine,
  Item,
  Orientation,
  ActivationMode,
  connect,
  Context,
  ConnectReturn,
  Status,
} from "@react-dive-ui/tabs-machine";
import { useActor } from "@xstate/react";
import { useCallback, useId } from "react";

export type TabsOptions = {
  id?: string;
  defaultValue: Item["value"];
  orientation?: Orientation;
  activationMode?: ActivationMode;
  onChange?: (details: { value: Item["value"] }) => void;
};

type UseTabsReturn = {
  state: {
    status: string;
  } & Context;
  apis: {
    activate: (value: Item["value"]) => void;
  };
  props: ConnectReturn;
};
export function useTabs(options: TabsOptions): UseTabsReturn {
  const internalId = useId();
  const [state, send] = useActor(
    machine.provide({
      actions: {
        onChange: ({ context }) => {
          options?.onChange?.({ value: context.value });
        },
      },
    }),
    {
      input: {
        id: options.id ?? internalId,
        value: options.defaultValue,
        orientation: options.orientation,
        activationMode: options.activationMode,
      },
    }
  );

  const activate = useCallback(
    (value: Item["value"]) => {
      send({ type: "ITEM.ACTIVATE", value });
    },
    [send]
  );

  const { value, context } = state;

  console.log("tabs value", state.value);
  console.log("tabs context", state.context);
  console.log("-----");

  return {
    state: { status: value as Status, ...context },
    apis: { activate },
    props: connect(state, send),
  };
}
