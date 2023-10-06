import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";
import { useDialogContext } from "../dialog-provider";

type TriggerProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const context = useDialogContext();
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

Trigger.displayName = "Dialog.Trigger";
