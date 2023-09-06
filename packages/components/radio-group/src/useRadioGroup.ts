import {
  ElementIds,
  FormOption,
  connect,
  radioGroupMachine,
} from "@react-dive-ui/radio-group-machine";
import { useActor } from "@xstate/react";
import { useCallback } from "react";

type Orientation = "vertical" | "horizontal";
export type RadioGroupOption = {
  id: string;
  ids?: ElementIds;
  orientation?: Orientation;
  form?: FormOption;
  disabled?: boolean;
  defaultValue?: string;
};

export function useRadioGroup(option: RadioGroupOption) {
  const [state, send] = useActor(radioGroupMachine, {
    input: {
      id: option.id,
      ids: option.ids,
      orientation: option.orientation,
      value: option.defaultValue,
      disabled: option.disabled,
      form: option.form,
    },
  });
  const { value, context } = state;

  const select = useCallback(
    (value: string) => {
      send({ type: "RADIO.SELECT", value });
    },
    [send]
  );

  const setDisabled = useCallback(
    (disabled: boolean) => {
      send({ type: "CONTEXT.SET", context: { disabled } });
    },
    [send]
  );

  const setOrientation = useCallback(
    (orientation: Orientation) => {
      send({ type: "CONTEXT.SET", context: { orientation } });
    },
    [send]
  );

  const setFormOption = useCallback(
    (option: FormOption) => {
      send({ type: "CONTEXT.SET", context: { form: option } });
    },
    [send]
  );

  return {
    state: { status: value, ...context },
    apis: { select, setDisabled, setOrientation, setFormOption },
    props: connect(state, send),
  };
}

export type RadioGroupStore = ReturnType<typeof useRadioGroup>;
