import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useRadioGroupStore } from "../providers/radio-group";
import { mergeProps } from "@react-dive-ui/merge-props";

type GroupProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Group = forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
  const store = useRadioGroupStore();
  const { groupProps } = store.props;

  const mergedProps = mergeProps(groupProps, props);
  return <dive.div {...mergedProps} ref={ref} />;
});

Group.displayName = "RadioGroup.Group";
