import { useActor } from "@xstate/react";
import { machine } from "@react-dive-ui/popover-machine";
import { useId } from "react";

import type {
  Context,
  FloatingOptions,
  Send,
  Service,
} from "@react-dive-ui/popover-machine";

type PopoverOptions = {
  id?: string;
  defaultOpen?: boolean;
  floatingOptions?: Partial<FloatingOptions>;
};

type Popover = {
  state: {
    status: string;
  } & Context;
  apis: {
    send: Send;
  };
  service: Service;
};

export function usePopover(options: PopoverOptions = {}): Popover {
  const internalId = useId();
  const [state, send, service] = useActor(machine, {
    input: {
      id: options.id ?? internalId,
      isOpen: options.defaultOpen ?? false,
      floatingOptions: options.floatingOptions,
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
