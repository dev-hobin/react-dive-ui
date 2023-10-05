import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useCheckboxContext } from "../checkbox-provider";

type ControlProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Control = forwardRef<HTMLButtonElement, ControlProps>(
  (props, ref) => {
    const context = useCheckboxContext();

    const { controlProps } = context.props;
    return <dive.button {...controlProps} {...props} ref={ref} />;
  }
);

Control.displayName = "Checkbox.Control";
