import { Item, machine } from "@react-dive-ui/radio-group-machine";
import { useActor } from "@xstate/react";

type RadioGroupOptions = {
  items: Item[];
};
export function useRadioGroup(options: RadioGroupOptions) {
  const [state, send, service] = useActor(machine, {
    input: {
      itemMap: new Map(options.items.map((item) => [item.value, item])),
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
