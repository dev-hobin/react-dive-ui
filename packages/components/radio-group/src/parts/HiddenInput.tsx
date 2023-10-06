import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useRadioGroupContext } from "../radio-group-provider";
import { useItem } from "../item-provider";

type HiddenInputProps = ComponentPropsWithoutRef<typeof dive.input>;
export const HiddenInput = forwardRef<HTMLInputElement, HiddenInputProps>(
  (props, ref) => {
    const context = useRadioGroupContext();
    const item = useItem();

    const { getHiddenInputProps } = context.props;
    const hiddenInputProps = getHiddenInputProps(item);

    const mergedProps = mergeProps(hiddenInputProps, props);
    return <dive.input {...mergedProps} ref={ref} />;
  }
);

HiddenInput.displayName = "RadioGroup.HiddenInput";
