import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useRadioGroupContext } from "../radio-group-provider";

type GroupProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Group = forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
  const context = useRadioGroupContext();
  const { groupProps } = context.props;

  const mergedProps = mergeProps(groupProps, props);
  return <dive.div {...mergedProps} ref={ref} />;
});

Group.displayName = "RadioGroup.Group";
