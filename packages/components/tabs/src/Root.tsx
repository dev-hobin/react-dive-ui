import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";

type CommonProps = ComponentPropsWithoutRef<typeof dive.div>;
type RootProps = CommonProps;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  return <dive.div {...props} ref={ref} />;
});

Root.displayName = "Tabs.Root";
