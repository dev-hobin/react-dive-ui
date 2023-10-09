import { useCallback, useId } from "react";
import { useActor } from "@xstate/react";
import {
  connect,
  machine,
  Context,
  Status,
  ConnectReturn,
} from "@react-dive-ui/popover-machine";

import type { FloatingOptions } from "@react-dive-ui/popover-machine";

export type PopoverOptions = {
  id?: string;
  defaultOpen?: boolean;
  floatingOptions?: Partial<FloatingOptions>;
  onChange?: (open: boolean) => void;
};

type UsePopoverReturn = {
  state: {
    status: Status;
  } & Context;
  apis: {
    open: () => void;
    close: () => void;
    toggle: () => void;
  };
  props: ConnectReturn;
};

export function usePopover(options: PopoverOptions = {}): UsePopoverReturn {
  const internalId = useId();
  const [state, send] = useActor(
    machine.provide({
      actions: {
        onChange: ({ context }) => {
          options.onChange?.(context.isOpen);
        },
      },
    }),
    {
      input: {
        id: options.id ?? internalId,
        isOpen: options.defaultOpen ?? false,
        floatingOptions: options.floatingOptions,
      },
    }
  );

  const open = useCallback(() => {
    send({ type: "OPEN" });
  }, [send]);

  const close = useCallback(() => {
    send({ type: "CLOSE" });
  }, [send]);

  const toggle = useCallback(() => {
    send({ type: "TOGGLE" });
  }, [send]);

  console.log("status", state.value);
  console.log("context", state.context);

  return {
    state: { status: state.value as Status, ...state.context },
    apis: { open, close, toggle },
    props: connect(state, send),
  };
}
