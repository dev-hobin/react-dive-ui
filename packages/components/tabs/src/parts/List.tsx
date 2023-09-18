import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";

type ListProps = ComponentPropsWithoutRef<typeof dive.div>;
export const List = forwardRef<HTMLDivElement, ListProps>((props, ref) => {
  return <dive.div {...props} ref={ref} />;
});

List.displayName = "Tabs.List";
