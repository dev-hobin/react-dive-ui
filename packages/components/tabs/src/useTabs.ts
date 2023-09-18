import {
  machine,
  Item,
  Orientation,
  ActivationMode,
} from "@react-dive-ui/tabs-machine";
import { useActor } from "@xstate/react";
import { useCallback, useId } from "react";

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type TabsOption = {
  id?: string;
  items: Optional<Item, "disabled">[];
  defaultValue: Item["value"];
  orientation?: Orientation;
  activationMode?: ActivationMode;
};
export function useTabs(options: TabsOption) {
  const internalId = useId();
  const [state, send, actorRef] = useActor(machine, {
    input: {
      id: options.id ?? internalId,
      itemMap: new Map(
        options.items?.map((item) => {
          if (item.disabled === undefined) {
            item.disabled = false;
          }
          return [item.value, item];
        })
      ),
      value: options.defaultValue,
      orientation: options.orientation,
      activationMode: options.activationMode,
    },
  });

  const activate = useCallback(
    (value: Item["value"]) => {
      send({ type: "ITEM.ACTIVATE", value });
    },
    [send]
  );

  const { value, context } = state;
  const items = Array.from(context.itemMap.values());

  console.log("tabs value", state.value);
  console.log("tabs context", state.context);
  console.log("-----");

  return {
    state: { status: value, items },
    apis: { activate },
    service: actorRef,
  };
}
