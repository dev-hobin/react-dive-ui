import { useActor } from "@xstate/react";
import {
  machine,
  Item,
  Orientation,
  Context,
  ConnectReturn,
  Status,
  connect,
} from "@react-dive-ui/accordion-machine";
import { useCallback, useId } from "react";

type SingleAccordionOptions = {
  type: "single";
  id?: string;
  defaultValue?: Item["value"];
  orientation?: Orientation;
  collapsible?: boolean;
  onChange?: (details: Item["value"] | null) => void;
};
type MultipleAccordionOptions = {
  type: "multiple";
  id?: string;
  defaultValue?: Item["value"][];
  orientation?: Orientation;
  onChange?: (details: Item["value"][]) => void;
};

export type AccordionOptions =
  | SingleAccordionOptions
  | MultipleAccordionOptions;

type UseAccordionReturn = {
  state: { status: Status } & Context;
  apis: {
    toggle: (value: Item["value"]) => void;
    open: (value: Item["value"]) => void;
    close: (value: Item["value"]) => void;
  };
  props: ConnectReturn;
};
export function useAccordion(options: AccordionOptions): UseAccordionReturn {
  const internalId = useId();
  const [state, send] = useActor(
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
        expandedValues: !options.defaultValue
          ? []
          : Array.isArray(options.defaultValue)
          ? options.defaultValue
          : [options.defaultValue],
      },
    }
  );

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

  const { value, context } = state;

  return {
    state: {
      status: value as Status,
      ...context,
    },
    apis: { toggle, open, close },
    props: connect(state, send),
  };
}
