import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useRadioGroupStore } from "../providers/radio-group";
import { mergeProps } from "@react-dive-ui/merge-props";

type LabelProps = Omit<
  ComponentPropsWithoutRef<typeof dive.label>,
  "value" | "disabled"
> & {
  value: string;
  disabled?: boolean;
};
export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { value, disabled = false, ...restProps } = props;
  const store = useRadioGroupStore();

  const { getLabelProps } = store.props;

  const mergedProps = mergeProps(getLabelProps(value, disabled), restProps);
  return <dive.label {...mergedProps} ref={ref} />;
});

Label.displayName = "RadioGroup.Label";
