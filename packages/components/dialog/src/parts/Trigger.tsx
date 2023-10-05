import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useDialogContext } from "../dialog-provider";

type TriggerProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const context = useDialogContext();

    const { triggerProps } = context.props;
    return <dive.button {...triggerProps} {...props} ref={ref} />;
  }
);

Trigger.displayName = "Dialog.Trigger";
