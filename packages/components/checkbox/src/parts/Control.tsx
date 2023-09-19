import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useService } from "../service-provider";
import { connect } from "@react-dive-ui/checkbox-machine";

type ControlProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Control = forwardRef<HTMLButtonElement, ControlProps>(
  (props, ref) => {
    const service = useService();

    const { controlProps } = connect(service);
    return <dive.button {...controlProps} {...props} ref={ref} />;
  }
);

Control.displayName = "Checkbox.Control";
