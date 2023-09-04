import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useAccordionStore } from "../providers/accordion";
import { useItem } from "../providers/item";

type TriggerProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const store = useAccordionStore();
    const item = useItem();

    const { getTriggerProps } = store.props;
    return (
      <button
        {...getTriggerProps(item.value, item.disabled)}
        {...props}
        ref={ref}
      />
    );
  }
);

Trigger.displayName = "Accordion.Trigger";
