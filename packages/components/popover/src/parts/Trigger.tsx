import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { usePopoverContext } from "../popover-provider";

type TriggerProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const context = usePopoverContext();

    const { triggerProps } = context.props;
    return <dive.button {...triggerProps} {...props} ref={ref} />;
  }
);

Trigger.displayName = "Popover.Trigger";
