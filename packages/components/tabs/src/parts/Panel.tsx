import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type PanelProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  return <dive.div {...props} ref={ref} />;
});

Panel.displayName = "Tabs.Panel";
