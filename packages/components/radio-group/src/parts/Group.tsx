import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useRadioGroupContext } from "../radio-group-provider";

type GroupProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Group = forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
  const context = useRadioGroupContext();

  const { groupProps } = context.props;
  return <dive.div {...groupProps} {...props} ref={ref} />;
});

Group.displayName = "RadioGroup.Group";
