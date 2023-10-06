import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { composeEventHandlers } from "@react-dive-ui/compose-event-handlers";
import { useCheckboxContext } from "../checkbox-provider";

type LabelProps = ComponentPropsWithoutRef<typeof dive.label>;
export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const context = useCheckboxContext();
  const { labelProps } = context.props;

  const mergedProps = mergeProps(labelProps, props);
  return (
    <dive.label
      {...mergedProps}
      onClick={composeEventHandlers(props.onClick, labelProps.onClick)}
      ref={ref}
    />
  );
});

Label.displayName = "Checkbox.Label";
