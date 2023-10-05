import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useRadioGroupContext } from "../radio-group-provider";
import { useItem } from "../item-provider";

type HiddenInputProps = ComponentPropsWithoutRef<typeof dive.input>;
export const HiddenInput = forwardRef<HTMLInputElement, HiddenInputProps>(
  (props, ref) => {
    const context = useRadioGroupContext();
    const item = useItem();

    const { getHiddenInputProps } = context.props;
    return <dive.input {...getHiddenInputProps(item)} {...props} ref={ref} />;
  }
);

HiddenInput.displayName = "RadioGroup.HiddenInput";
