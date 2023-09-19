import { useCallback, useId } from "react";
import { useActor } from "@xstate/react";
import {
  CheckedState,
  FormOptions,
  machine,
} from "@react-dive-ui/checkbox-machine";

type CheckboxOptions = {
  id?: string;
  checkedState?: CheckedState;
  disabled?: boolean;
  form?: FormOptions;
  value?: string;
  onChange?: (checked: CheckedState) => void;
};
export function useCheckbox(options: CheckboxOptions = {}) {
  const internalId = useId();
  const [state, send, actorRef] = useActor(
    machine.provide({
      actions: {
        onChange: ({ context }) => {
          options.onChange?.(context.checkedState);
        },
      },
    }),
    {
      input: {
        id: options.id ?? internalId,
        checkedState: options.checkedState,
        disabled: options.disabled,
        form: options.form,
        value: options.value,
      },
    }
  );

  console.log("----------");
  console.log(state.context);

  const check = useCallback(() => {
    send({ type: "CHECK" });
  }, [send]);

  const setChecked = useCallback(
    (checked: boolean) => {
      send({ type: "SET.CHECKED", checked });
    },
    [send]
  );

  const setIndeterminate = useCallback(() => {
    send({ type: "SET.INDETERMINATE" });
  }, [send]);

  const setDisabled = useCallback(
    (disabled: boolean) => {
      send({ type: "SET.DISABLED", disabled });
    },
    [send]
  );

  const { value, context } = state;
  return {
    state: {
      status: value,
      ...context,
    },
    apis: { check, setChecked, setIndeterminate, setDisabled },
    service: actorRef,
  };
}
