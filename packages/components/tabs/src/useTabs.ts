import {
  tabsMachine,
  connect,
  ElementIds,
  ChangeDetails,
  FocusChangeDetails,
} from "@react-dive-ui/tabs-machine";
import { useActor } from "@xstate/react";
import { useCallback } from "react";

type Orientation = "vertical" | "horizontal";
type ActivationMode = "manual" | "automatic";
export type TabsOption = {
  id: string;
  ids?: ElementIds;
  orientation?: Orientation;
  activationMode?: ActivationMode;
  defaultValue?: string;
};
export type Listeners = {
  onChange?: (details: ChangeDetails) => void;
  onFocusChange?: (details: FocusChangeDetails) => void;
};
export function useTabs(option: TabsOption, listeners?: Listeners) {
  const [state, send] = useActor(
    tabsMachine.provide({
      actions: {
        onChange: ({ context }) => {
          if (!context.value) return;
          listeners?.onChange?.({ value: context.value });
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
        orientation: option.orientation,
        activationMode: option.activationMode,
        value: option.defaultValue,
      },
    }
  );

  const activate = useCallback(
    (value: string) => {
      send({ type: "TRIGGER.ACTIVATE", value });
    },
    [send]
  );
  const setActivationMode = useCallback(
    (mode: ActivationMode) => {
      send({ type: "CONTEXT.SET", context: { activationMode: mode } });
    },
    [send]
  );
  const setOrientation = useCallback(
    (orientation: Orientation) => {
      send({ type: "CONTEXT.SET", context: { orientation } });
    },
    [send]
  );

  const { value, context } = state;
  return {
    state: { status: value, ...context },
    apis: { activate, setActivationMode, setOrientation },
    props: connect(state, send),
  };
}

export type TabsStore = ReturnType<typeof useTabs>;
