import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { Item, connect } from "@react-dive-ui/tabs-machine";
import { useService } from "../service-provider";

type PanelProps = Omit<ComponentPropsWithoutRef<typeof dive.div>, "value"> & {
  value: Item["value"];
};
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { value, ...restProps } = props;

  const service = useService();

  const { getPanelProps } = connect(service);
  return <dive.div {...getPanelProps(value)} {...restProps} ref={ref} />;
});

Panel.displayName = "Tabs.Panel";
