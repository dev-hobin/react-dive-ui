import { useId } from "react";
import { useActor } from "@xstate/react";
import { connect, machine } from "@react-dive-ui/popover-machine";

import type { FloatingOptions } from "@react-dive-ui/popover-machine";

export type PopoverOptions = {
  id?: string;
  defaultOpen?: boolean;
  floatingOptions?: Partial<FloatingOptions>;
  onChange?: (open: boolean) => void;
};

export function usePopover(options: PopoverOptions = {}) {
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

  console.log("status", state.value);
  console.log("context", state.context);

  return {
    state: { status: state.value, ...state.context },
    apis: { send },
    props: connect(state, send),
  };
}
