import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";

type ListProps = ComponentPropsWithoutRef<typeof dive.div>;
export const List = forwardRef<HTMLDivElement, ListProps>((props, ref) => {
  return <dive.div {...props} ref={ref} />;
});

List.displayName = "Tabs.List";
