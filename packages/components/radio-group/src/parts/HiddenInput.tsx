import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";

type HiddenInputProps = ComponentPropsWithoutRef<typeof dive.input>;
export const HiddenInput = forwardRef<HTMLInputElement, HiddenInputProps>(
  (props, ref) => {
    return <dive.input {...props} ref={ref} />;
  }
);

HiddenInput.displayName = "RadioGroup.HiddenInput";
