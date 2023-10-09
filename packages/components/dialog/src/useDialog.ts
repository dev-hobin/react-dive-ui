import { useActor } from "@xstate/react";
import {
  connect,
  machine,
  Context,
  ConnectReturn,
  Status,
} from "@react-dive-ui/dialog-machine";
import { useCallback, useId } from "react";

export type DialogOptions = {
  id?: string;
  modal?: boolean;
  defaultOpen?: boolean;
  initialFocusEl?: () => HTMLElement | null;
  scrollLock?: boolean;
  onChange?: (open: boolean) => void;
};

type UseDialogReturn = {
  state: {
    status: Status;
  } & Context;
  apis: {
    open: () => void;
    close: () => void;
  };
  props: ConnectReturn;
};

export function useDialog(
  options: DialogOptions = { modal: true }
): UseDialogReturn {
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

  const open = useCallback(() => {
    send({ type: "OPEN" });
  }, [send]);

  const close = useCallback(() => {
    send({ type: "CLOSE" });
  }, [send]);

  return {
    state: { status: state.value as Status, ...state.context },
    apis: { open, close },
    props: connect(state, send),
  };
}
