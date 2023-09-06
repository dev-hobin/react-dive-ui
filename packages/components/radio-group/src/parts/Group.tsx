import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type GroupProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Group = forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
  return <dive.div {...props} ref={ref} />;
});

Group.displayName = "RadioGroup.Group";
