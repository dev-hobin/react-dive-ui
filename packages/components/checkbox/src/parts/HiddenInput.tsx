import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useService } from "../service-provider";
import { connect } from "@react-dive-ui/checkbox-machine";

type HiddenInputProps = ComponentPropsWithoutRef<typeof dive.input>;
export const HiddenInput = forwardRef<HTMLInputElement, HiddenInputProps>(
  (props, ref) => {
    const service = useService();

    const { hiddenInputProps } = connect(service);
    return <dive.input {...hiddenInputProps} {...props} ref={ref} />;
  }
);

HiddenInput.displayName = "Checkbox.HiddenInput";
