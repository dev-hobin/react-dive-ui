import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";

type RootProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  return <dive.div {...props} ref={ref} />;
});

Root.displayName = "Tabs.Root";
