import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { ItemProp } from "@react-dive-ui/tabs-machine";
import { mergeProps } from "@react-dive-ui/merge-props";
import { useTabsContext } from "../tabs-provider";

type PanelProps = Omit<ComponentPropsWithoutRef<typeof dive.div>, "value"> & {
  value: ItemProp["value"];
};
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { value, ...restProps } = props;

  const context = useTabsContext();

  const { getPanelProps } = context.props;
  const panelProps = getPanelProps(value);

  const mergedProps = mergeProps(panelProps, restProps);
  return <dive.div {...mergedProps} ref={ref} />;
});

Panel.displayName = "Tabs.Panel";
