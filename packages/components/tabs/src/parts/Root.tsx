import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useTabsContext } from "../tabs-provider";
import { mergeProps } from "@react-dive-ui/merge-props";

type RootProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const context = useTabsContext();

  const { rootProps } = context.props;

  const mergedProps = mergeProps(rootProps, props);
  return <dive.div {...mergedProps} ref={ref} />;
});

Root.displayName = "Tabs.Root";
