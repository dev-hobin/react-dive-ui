import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";

type CommonProps = ComponentPropsWithoutRef<typeof dive.ol>;
type ListProps = CommonProps;
export const List = forwardRef<HTMLOListElement, ListProps>((props, ref) => {
  return <dive.ol {...props} ref={ref} />;
});

List.displayName = "Tabs.List";
