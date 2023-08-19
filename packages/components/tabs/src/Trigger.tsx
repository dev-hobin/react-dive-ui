import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";

type CommonProps = ComponentPropsWithoutRef<typeof dive.button>;
type TriggerProps = CommonProps;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    return <dive.button {...props} ref={ref} />;
  }
);

Trigger.displayName = "Tabs.Trigger";
