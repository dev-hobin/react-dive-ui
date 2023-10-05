import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { usePopoverContext } from "../popover-provider";

type PanelProps = ComponentPropsWithoutRef<typeof dive.article>;
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const context = usePopoverContext();

  const { panelProps } = context.props;
  return <dive.article {...panelProps} {...props} ref={ref} />;
});

Panel.displayName = "Popover.Panel";
