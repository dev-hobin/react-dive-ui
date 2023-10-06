import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { usePopoverContext } from "../popover-provider";

type ArrowProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Arrow = forwardRef<HTMLDivElement, ArrowProps>((props, ref) => {
  const context = usePopoverContext();
  const { arrowProps } = context.props;

  const mergedProps = mergeProps(arrowProps, props);
  return <dive.div {...mergedProps} ref={ref} />;
});

Arrow.displayName = "Popover.Arrow";
