import {
  accordionMachine,
  connect,
  ElementIds,
  ChangeDetails,
  FocusChangeDetails,
} from "@react-dive-ui/accordion-machine";
import { useActor } from "@xstate/react";
import { useCallback } from "react";

type CommonOption = {
  id: string;
  ids?: ElementIds;
  orientation?: "vertical" | "horizontal";
};
type SingleAccordionOption = CommonOption & {
  type: "single";
  defaultValue?: string;
  collapsible?: boolean;
};
type MultipleAccordionOption = CommonOption & {
  type: "multiple";
  defaultValue?: string[];
};
type Listeners = {
  onChange?: (details: ChangeDetails) => void;
  onFocusChange?: (details: FocusChangeDetails) => void;
};

export type AccordionOption = SingleAccordionOption | MultipleAccordionOption;
export function useAccordion(option: AccordionOption, listeners?: Listeners) {
  const [state, send] = useActor(
    accordionMachine.provide({
      actions: {
        onChange: ({ context }) => {
          listeners?.onChange?.({ value: context.expandedValues });
        },
        onFocusChange: ({ context }) => {
          listeners?.onFocusChange?.({ value: context.focusedValue });
        },
      },
    }),
    {
      input: {
        id: option.id,
        ids: option.ids,
        type: option.type,
        collapsible: option.type === "single" && option.collapsible,
        orientation: option.orientation,
        expandedValues: toArray(option.defaultValue),
      },
    }
  );

  const toggle = useCallback(
    (value: string) => {
      send({ type: "ITEM.TOGGLE", value });
    },
    [send]
  );
  const open = useCallback(
    (value: string) => {
      send({ type: "ITEM.EXPAND", value });
    },
    [send]
  );
  const close = useCallback(
    (value: string) => {
      send({ type: "ITEM.COLLAPSE", value });
    },
    [send]
  );

  const { value, context } = state;
  return {
    state: { status: value, ...context },
    apis: { toggle, open, close },
    props: connect(state, send),
  };
}

function toArray(v: undefined | string | string[]) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  return [v];
}

export type AccordionStore = ReturnType<typeof useAccordion>;
