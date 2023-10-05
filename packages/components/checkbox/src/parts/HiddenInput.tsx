import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useCheckboxContext } from "../checkbox-provider";

type HiddenInputProps = ComponentPropsWithoutRef<typeof dive.input>;
export const HiddenInput = forwardRef<HTMLInputElement, HiddenInputProps>(
  (props, ref) => {
    const context = useCheckboxContext();

    const { hiddenInputProps } = context.props;
    return <dive.input {...hiddenInputProps} {...props} ref={ref} />;
  }
);

HiddenInput.displayName = "Checkbox.HiddenInput";
