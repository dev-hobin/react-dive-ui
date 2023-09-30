import { useActor } from "@xstate/react";
import { machine } from "@react-dive-ui/dialog-machine";
import { useId } from "react";

import type { Context, Send, Service } from "@react-dive-ui/dialog-machine";

type DialogOptions = {
  id?: string;
  type: "modal" | "non-modal";
  initialOpen?: boolean;
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

export function useDialog(options: DialogOptions = { type: "modal" }): Dialog {
  const internalId = useId();
  const [state, send, service] = useActor(machine, {
    input: {
      id: options.id ?? internalId,
      type: options.type,
      open: options.initialOpen ?? false,
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
