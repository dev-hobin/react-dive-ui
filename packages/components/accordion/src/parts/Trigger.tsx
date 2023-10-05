import { forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useAccordionContext } from "../accordion-provider";
import { useItem } from "../item-provider";

import type { ComponentPropsWithoutRef } from "react";

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  "value" | "disabled"
>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const context = useAccordionContext();
    const item = useItem();

    const { getTriggerProps } = context.props;
    const triggerProps = getTriggerProps(item);

    return <dive.button {...triggerProps} {...props} ref={ref} />;
  }
);

Trigger.displayName = "Accordion.Trigger";
