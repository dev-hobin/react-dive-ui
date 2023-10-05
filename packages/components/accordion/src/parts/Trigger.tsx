import { forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useService } from "../service-provider";
import { useItem } from "../item-provider";

import type { ComponentPropsWithoutRef } from "react";
import { connect } from "@react-dive-ui/accordion-machine";

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  "value" | "disabled"
>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const service = useService();
    const item = useItem();

    const { getTriggerProps } = connect(service);
    const triggerProps = getTriggerProps(item);

    return <dive.button {...triggerProps} {...props} ref={ref} />;
  }
);

Trigger.displayName = "Accordion.Trigger";
