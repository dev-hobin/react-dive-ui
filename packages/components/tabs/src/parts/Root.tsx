import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useTabsContext } from "../tabs-provider";

type RootProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const context = useTabsContext();

  const { rootProps } = context.props;
  return <dive.div {...rootProps} {...props} ref={ref} />;
});

Root.displayName = "Tabs.Root";
