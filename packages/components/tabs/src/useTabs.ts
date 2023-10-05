import {
  machine,
  Item,
  Orientation,
  ActivationMode,
} from "@react-dive-ui/tabs-machine";
import { useActor } from "@xstate/react";
import { useCallback, useId } from "react";

type TabsOptions = {
  id?: string;
  defaultValue: Item["value"];
  orientation?: Orientation;
  activationMode?: ActivationMode;
  onChange?: (details: { value: Item["value"] }) => void;
};
export function useTabs(options: TabsOptions) {
  const internalId = useId();
  const [state, send, actorRef] = useActor(
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
    service: actorRef,
  };
}
