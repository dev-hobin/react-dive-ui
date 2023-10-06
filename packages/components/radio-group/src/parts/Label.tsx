import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useRadioGroupContext } from "../radio-group-provider";
import { useItem } from "../item-provider";
import { mergeProps } from "@react-dive-ui/merge-props";

type LabelProps = ComponentPropsWithoutRef<typeof dive.label>;
export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const context = useRadioGroupContext();
  const item = useItem();

  const { getLabelProps } = context.props;
  const labelProps = getLabelProps(item);

  const mergedProps = mergeProps(labelProps, props);
  return <dive.label {...mergedProps} ref={ref} />;
});

Label.displayName = "RadioGroup.Label";
