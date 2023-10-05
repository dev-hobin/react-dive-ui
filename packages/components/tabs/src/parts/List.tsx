import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useTabsContext } from "../tabs-provider";

type ListProps = ComponentPropsWithoutRef<typeof dive.div>;
export const List = forwardRef<HTMLDivElement, ListProps>((props, ref) => {
  const context = useTabsContext();

  const { listProps } = context.props;
  return <dive.div {...listProps} {...props} ref={ref} />;
});

List.displayName = "Tabs.List";
