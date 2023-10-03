import { useActor } from "@xstate/react";
import { machine } from "@react-dive-ui/dialog-machine";
import { useId } from "react";

import type { Context, Send, Service } from "@react-dive-ui/dialog-machine";

type DialogOptions = {
  id?: string;
  modal?: boolean;
  defaultOpen?: boolean;
  initialFocusEl?: () => HTMLElement | null;
  scrollLock?: boolean;
};

type Dialog = {
  state: {
    status: string;
  } & Context;
  apis: {
    send: Send;
  };
  service: Service;
};

export function useDialog(options: DialogOptions = { modal: true }): Dialog {
  const internalId = useId();
  const [state, send, service] = useActor(machine, {
    input: {
      id: options.id ?? internalId,
      type: options.modal ? "modal" : "non-modal",
      open: options.defaultOpen ?? false,
      initialFocusEl: options.initialFocusEl,
      scrollLock: options.scrollLock ?? true,
    },
  });

  console.log("status", state.value);
  console.log("context", state.context);

  return {
    state: { status: state.value as string, ...state.context },
    apis: { send },
    service,
  };
}
