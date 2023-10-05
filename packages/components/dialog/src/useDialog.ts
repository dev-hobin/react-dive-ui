import { useActor } from "@xstate/react";
import { connect, machine } from "@react-dive-ui/dialog-machine";
import { useId } from "react";

export type DialogOptions = {
  id?: string;
  modal?: boolean;
  defaultOpen?: boolean;
  initialFocusEl?: () => HTMLElement | null;
  scrollLock?: boolean;
  onChange?: (open: boolean) => void;
};

export function useDialog(options: DialogOptions = { modal: true }) {
  const internalId = useId();
  const [state, send] = useActor(
    machine.provide({
      actions: {
        onChange: ({ context }) => {
          options.onChange?.(context.open);
        },
      },
    }),
    {
      input: {
        id: options.id ?? internalId,
        type: options.modal ? "modal" : "non-modal",
        open: options.defaultOpen ?? false,
        initialFocusEl: options.initialFocusEl,
        scrollLock: options.scrollLock ?? true,
      },
    }
  );

  console.log("status", state.value);
  console.log("context", state.context);

  return {
    state: { status: state.value, ...state.context },
    apis: { send },
    props: connect(state, send),
  };
}
