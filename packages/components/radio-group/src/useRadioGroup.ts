import { ItemOption, machine } from "@react-dive-ui/radio-group-machine";
import { useActor } from "@xstate/react";
import { useId } from "react";

type RadioGroupOptions = {
  id?: string;
  items: ItemOption[];
};
export function useRadioGroup(options: RadioGroupOptions) {
  const internalId = useId();
  const [state, send, service] = useActor(machine, {
    input: {
      id: options.id ?? internalId,
      itemMap: new Map(
        options.items.map((item) => [
          item.value,
          { ...item, labelled: item.labelledby ?? true },
        ])
      ),
    },
  });

  console.log("---------");
  console.log("status", state.value);
  console.log("context", state.context);

  const itemMap = state.context.itemMap;
  const items = Array.from(itemMap.values());

  return {
    state: { status: state.value, items },
    apis: { send },
    service,
  };
}
