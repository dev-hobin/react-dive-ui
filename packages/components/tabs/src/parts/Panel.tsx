import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { ItemProp } from "@react-dive-ui/tabs-machine";
import { useTabsContext } from "../tabs-provider";

type PanelProps = Omit<ComponentPropsWithoutRef<typeof dive.div>, "value"> & {
  value: ItemProp["value"];
};
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { value, ...restProps } = props;

  const context = useTabsContext();

  const { getPanelProps } = context.props;
  return <dive.div {...getPanelProps(value)} {...restProps} ref={ref} />;
});

Panel.displayName = "Tabs.Panel";
