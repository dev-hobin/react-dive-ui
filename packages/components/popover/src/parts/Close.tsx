import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { usePopoverContext } from "../popover-provider";

type CloseProps = ComponentPropsWithoutRef<typeof dive.button>;
export const Close = forwardRef<HTMLButtonElement, CloseProps>((props, ref) => {
  const context = usePopoverContext();

  const { closeProps } = context.props;
  return <dive.button {...closeProps} {...props} ref={ref} />;
});

Close.displayName = "Popover.Close";
