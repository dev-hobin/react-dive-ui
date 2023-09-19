import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useService } from "../service-provider";
import { connect } from "@react-dive-ui/checkbox-machine";

type LabelProps = ComponentPropsWithoutRef<typeof dive.label>;
export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const service = useService();

  const { labelProps } = connect(service);
  return <dive.label {...labelProps} {...props} ref={ref} />;
});

Label.displayName = "Checkbox.Label";
