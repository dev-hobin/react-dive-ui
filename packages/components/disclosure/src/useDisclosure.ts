import { useCallback } from "react";
import { useActor } from "@xstate/react";
import { disclosureMachine } from "@react-dive-ui/disclosure-machine";
import { usePreviousValue } from "@react-dive-ui/use-previous-value";
import { useIsomorphicLayoutEffect } from "@react-dive-ui/use-isomorphic-layout-effect";
import isEqual from "lodash.isequal";

type DisclosureProps = {
  initial: {
    id: string;
    expanded?: boolean;
    disabled?: boolean;
  };
  listeners?: {
    onExpandedChange?: (details: { expanded: boolean }) => void;
  };
  options?: {
    disabled?: boolean;
  };
};
export function useDisclosure(props: DisclosureProps) {
  const { initial, listeners, options } = props;
  const [_state, _send] = useActor(
    disclosureMachine.provide({
      actions: {
        onExpandedChange: ({ context }) => {
          if (_state.context.expanded === context.expanded) return;
          listeners?.onExpandedChange?.({ expanded: context.expanded });
        },
      },
    }),
    {
      input: {
        id: initial.id,
        disabled: options?.disabled ?? initial.disabled,
        expanded: initial.expanded,
      },
    }
  );

  const show = useCallback(() => _send({ type: "TRIGGER.SHOW" }), [_send]);
  const hide = useCallback(() => _send({ type: "TRIGGER.HIDE" }), [_send]);
  const toggle = useCallback(() => _send({ type: "TRIGGER.TOGGLE" }), [_send]);

  const setDisabled = useCallback(
    (disabled: boolean) =>
      _send({ type: "CONTEXT.SET", context: { disabled } }),
    [_send]
  );
  const setExpanded = useCallback(
    (expanded: boolean) => _send({ type: "EXPANDED.SET", expanded }),
    [_send]
  );

  const previousOptions = usePreviousValue(options);
  useIsomorphicLayoutEffect(() => {
    if (isEqual(previousOptions, options)) return;
    console.log("HERE");
    _send({ type: "CONTEXT.SET", context: { ...options } });
  }, [previousOptions, options, _send]);

  return {
    state: { status: _state.value, ..._state.context },
    apis: { _send, show, hide, toggle, setDisabled, setExpanded },
  } as const;
}
