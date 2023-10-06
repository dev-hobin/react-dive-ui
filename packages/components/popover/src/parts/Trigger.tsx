import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";
import { usePopoverContext } from "../popover-provider";

type TriggerProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const context = usePopoverContext();
    const { triggerProps } = context.props;

    const mergedProps = mergeProps(triggerProps, props);
    return (
      <dive.button
        {...mergedProps}
        onClick={composeEventHandlers(props.onClick, triggerProps.onClick)}
        ref={ref}
      />
    );
  }
);

Trigger.displayName = "Popover.Trigger";
