import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useTabsStore } from "../tabs-provider";
import { mergeProps } from "@react-dive-ui/merge-props";

type RootProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const store = useTabsStore();
  const { rootProps } = store.props;

  const mergedProps = mergeProps(rootProps, props);
  return <dive.div {...mergedProps} ref={ref} />;
});

Root.displayName = "Tabs.Root";
