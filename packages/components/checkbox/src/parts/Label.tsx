import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useCheckboxContext } from "../checkbox-provider";

type LabelProps = ComponentPropsWithoutRef<typeof dive.label>;
export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const context = useCheckboxContext();

  const { labelProps } = context.props;
  return <dive.label {...labelProps} {...props} ref={ref} />;
});

Label.displayName = "Checkbox.Label";
