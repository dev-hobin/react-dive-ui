import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { useTabsContext } from "../tabs-provider";

type ListProps = ComponentPropsWithoutRef<typeof dive.div>;
export const List = forwardRef<HTMLDivElement, ListProps>((props, ref) => {
  const context = useTabsContext();
  const { listProps } = context.props;

  const mergedProps = mergeProps(listProps, props);
  return <dive.div {...mergedProps} ref={ref} />;
});

List.displayName = "Tabs.List";
