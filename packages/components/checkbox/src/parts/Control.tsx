import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";

type ControlProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Control = forwardRef<HTMLButtonElement, ControlProps>(
  (props, ref) => {
    return <dive.button {...props} ref={ref} />;
  }
);

Control.displayName = "Checkbox.Control";
