import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";
import { useItem, useProps } from "./providers";

type TriggerProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const item = useItem();
    const { getTriggerProps } = useProps();
    const { onClick, onFocus, onBlur, onKeyDown, ...triggerProps } =
      getTriggerProps(item.value);

    const mergedProps = mergeProps(triggerProps, props);

    return (
      <dive.button
        {...mergedProps}
        ref={ref}
        onClick={composeEventHandlers(props.onClick, onClick)}
        onFocus={composeEventHandlers(props.onFocus, onFocus)}
        onBlur={composeEventHandlers(props.onBlur, onBlur)}
        onKeyDown={composeEventHandlers(props.onKeyDown, onKeyDown)}
      />
    );
  }
);

Trigger.displayName = "Accordion.Trigger";
