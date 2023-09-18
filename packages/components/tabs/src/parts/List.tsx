import { ComponentPropsWithoutRef, forwardRef } from "react";
import { connect } from "@react-dive-ui/tabs-machine";
import { dive } from "@react-dive-ui/dive";
import { useService } from "../service-provider";

type ListProps = ComponentPropsWithoutRef<typeof dive.div>;
export const List = forwardRef<HTMLDivElement, ListProps>((props, ref) => {
  const service = useService();

  const { listProps } = connect(service);
  return <dive.div {...listProps} {...props} ref={ref} />;
});

List.displayName = "Tabs.List";
