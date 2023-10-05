import {
  machine,
  Item,
  Orientation,
  ActivationMode,
  connect,
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
export function useTabs(options: TabsOptions) {
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
    state: { status: value, ...context },
    apis: { activate },
    props: connect(state, send),
  };
}
