import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useTabsStore } from "../tabs-provider";
import { mergeProps } from "@react-dive-ui/merge-props";

type ListProps = ComponentPropsWithoutRef<typeof dive.div>;
export const List = forwardRef<HTMLDivElement, ListProps>((props, ref) => {
  const store = useTabsStore();
  const { listProps } = store.props;

  const mergedProps = mergeProps(listProps, props);
  return <dive.div {...mergedProps} ref={ref} />;
});

List.displayName = "Tabs.List";
