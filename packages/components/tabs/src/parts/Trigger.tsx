import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";

type TriggerProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  (props, ref) => {
    return <dive.button {...props} ref={ref} />;
  }
);

Trigger.displayName = "Tabs.Trigger";
