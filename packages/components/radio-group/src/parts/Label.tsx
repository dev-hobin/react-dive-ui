import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useRadioGroupContext } from "../radio-group-provider";
import { useItem } from "../item-provider";

type LabelProps = ComponentPropsWithoutRef<typeof dive.label>;
export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const context = useRadioGroupContext();
  const item = useItem();

  const { getLabelProps } = context.props;
  return <dive.label {...getLabelProps(item)} {...props} ref={ref} />;
});

Label.displayName = "RadioGroup.Label";
