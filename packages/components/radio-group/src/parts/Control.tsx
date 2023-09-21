import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type ControlProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Control = forwardRef<HTMLButtonElement, ControlProps>(
  (props, ref) => {
    return <dive.button {...props} ref={ref} />;
  }
);

Control.displayName = "RadioGroup.Control";
