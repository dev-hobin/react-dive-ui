import { useActor } from "@xstate/react";
import { machine, Item, Orientation } from "@react-dive-ui/accordion-machine";
import { useCallback, useId } from "react";

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type SingleAccordionOptions = {
  type: "single";
  id?: string;
  items?: Optional<Item, "disabled">[];
  initialExpanded?: Item["value"];
  orientation?: Orientation;
  collapsible?: boolean;
  onChange?: (details: Item["value"] | null) => void;
};
type MultipleAccordionOptions = {
  type: "multiple";
  id?: string;
  items?: Optional<Item, "disabled">[];
  initialExpanded?: Item["value"][];
  orientation?: Orientation;
  onChange?: (details: Item["value"][]) => void;
};

type AccordionOptions = SingleAccordionOptions | MultipleAccordionOptions;
export function useAccordion(options: AccordionOptions) {
  const internalId = useId();
  const [state, send, actorRef] = useActor(
    machine.provide({
      actions: {
        onChange: ({ context }) => {
          if (options.type === "single") {
            options.onChange?.(context.expandedValues[0] ?? null);
          } else {
            options.onChange?.(context.expandedValues);
          }
        },
      },
    }),
    {
      input: {
        id: options.id ?? internalId,
        type: options.type,
        collapsible: options.type === "multiple" || options.collapsible,
        orientation: options.orientation ?? "vertical",
        expandedValues: !options.initialExpanded
          ? []
          : Array.isArray(options.initialExpanded)
          ? options.initialExpanded
          : [options.initialExpanded],
        itemMap: new Map(
          options.items?.map((item) => {
            if (item.disabled === undefined) {
              item.disabled = false;
            }
            return [item.value, item];
          })
        ),
      },
    }
  );
  console.log("accordion value", state.value);
  console.log("accordion context", state.context);
  console.log("-----");

  const toggle = useCallback(
    (value: Item["value"]) => {
      send({ type: "ITEM.TOGGLE", value });
    },
    [send]
  );

  const open = useCallback(
    (value: Item["value"]) => {
      send({ type: "ITEM.EXPAND", value });
    },
    [send]
  );

  const close = useCallback(
    (value: Item["value"]) => {
      send({ type: "ITEM.COLLAPSE", value });
    },
    [send]
  );

  const setItemDisabled = useCallback(
    (value: Item["value"], disabled: boolean) => {
      send({ type: "SET.ITEM.DISABLED", value, disabled });
    },
    [send]
  );

  const { value, context } = state;

  const items = Array.from(context.itemMap.values());

  return {
    state: { status: value, items: items },
    apis: { toggle, open, close, setItemDisabled },
    service: actorRef,
  };
}
