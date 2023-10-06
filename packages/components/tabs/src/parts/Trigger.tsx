import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { ItemProp } from "@react-dive-ui/tabs-machine";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";
import { useTabsContext } from "../tabs-provider";

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  keyof ItemProp
> &
  ItemProp;

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { value, disabled = false, ...restProps } = props;
    const context = useTabsContext();
    const { getTriggerProps } = context.props;

    const triggerProps = getTriggerProps({ value, disabled });
    const mergedProps = mergeProps(triggerProps, restProps);
    return (
      <dive.button
        {...mergedProps}
        onClick={composeEventHandlers(props.onClick, triggerProps.onClick)}
        onFocus={composeEventHandlers(props.onFocus, triggerProps.onFocus)}
        onBlur={composeEventHandlers(props.onBlur, triggerProps.onBlur)}
        onKeyDown={composeEventHandlers(
          props.onKeyDown,
          triggerProps.onKeyDown
        )}
        ref={ref}
      />
    );
  }
);

Trigger.displayName = "Tabs.Trigger";
