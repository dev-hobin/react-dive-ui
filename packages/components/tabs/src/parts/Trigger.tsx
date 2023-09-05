import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useTabsStore } from "../tabs-provider";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  "value" | "disabled"
> & {
  value: string;
  disabled?: boolean;
};
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { value, disabled = false, ...restProps } = props;
    const store = useTabsStore();

    const { getTriggerProps } = store.props;
    const { onClick, onFocus, onBlur, onKeyDown, ...triggerProps } =
      getTriggerProps(value, disabled);

    const mergedProps = mergeProps(triggerProps, restProps);
    return (
      <dive.button
        {...mergedProps}
        onClick={composeEventHandlers(props.onClick, onClick)}
        onFocus={composeEventHandlers(props.onFocus, onFocus)}
        onBlur={composeEventHandlers(props.onBlur, onBlur)}
        onKeyDown={composeEventHandlers(props.onKeyDown, onKeyDown)}
        ref={ref}
      />
    );
  }
);

Trigger.displayName = "Tabs.Trigger";
