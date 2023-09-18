import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { Item, connect } from "@react-dive-ui/tabs-machine";
import { useService } from "../service-provider";

type TriggerProps = Omit<
  ComponentPropsWithoutRef<typeof dive.button>,
  "value"
> & { value: Item["value"] };
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    const { value, ...restProps } = props;
    const service = useService();

    const { getTriggerProps } = connect(service);
    return <dive.button {...getTriggerProps(value)} {...restProps} ref={ref} />;
  }
);

Trigger.displayName = "Tabs.Trigger";
