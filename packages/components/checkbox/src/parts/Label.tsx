import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";

type LabelProps = ComponentPropsWithoutRef<typeof dive.label>;
export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  return <dive.label {...props} ref={ref} />;
});

Label.displayName = "Checkbox.Label";
