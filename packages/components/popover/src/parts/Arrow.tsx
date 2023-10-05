import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { usePopoverContext } from "../popover-provider";

type ArrowProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Arrow = forwardRef<HTMLDivElement, ArrowProps>((props, ref) => {
  const context = usePopoverContext();

  const { arrowProps } = context.props;
  return <dive.div {...arrowProps} {...props} ref={ref} />;
});

Arrow.displayName = "Popover.Arrow";
