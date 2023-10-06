import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { usePopoverContext } from "../popover-provider";

type PanelProps = ComponentPropsWithoutRef<typeof dive.article>;
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const context = usePopoverContext();
  const { panelProps } = context.props;

  const mergedProps = mergeProps(panelProps, props);
  return <dive.article {...mergedProps} ref={ref} />;
});

Panel.displayName = "Popover.Panel";
