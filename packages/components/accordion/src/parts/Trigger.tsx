import { forwardRef, ComponentPropsWithoutRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";
import { useAccordionContext } from "../accordion-provider";
import { useItem } from "../item-provider";

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  "value" | "disabled"
>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const context = useAccordionContext();
    const item = useItem();

    const { getTriggerProps } = context.props;
    const { onFocus, onBlur, onKeyDown, onClick, ...triggerProps } =
      getTriggerProps(item);

    const mergedProps = mergeProps(triggerProps, props);

    return (
      <dive.button
        {...mergedProps}
        onFocus={composeEventHandlers(props.onFocus, onFocus)}
        onBlur={composeEventHandlers(props.onBlur, onBlur)}
        onKeyDown={composeEventHandlers(props.onKeyDown, onKeyDown)}
        onClick={composeEventHandlers(props.onClick, onClick)}
        ref={ref}
      />
    );
  }
);

Trigger.displayName = "Accordion.Trigger";
