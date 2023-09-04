import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useAccordionStore } from "../providers/accordion";
import { useItem } from "../providers/item";

type TriggerProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const store = useAccordionStore();
    const item = useItem();

    const { getTriggerProps } = store.props;
    const { onClick, onFocus, onKeyDown, onBlur, ...triggerProps } =
      getTriggerProps(item.value, item.disabled);

    const mergedProps = mergeProps(triggerProps, props);
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

Trigger.displayName = "Accordion.Trigger";
