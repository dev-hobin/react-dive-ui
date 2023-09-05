import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useTabsStore } from "../tabs-provider";
import { mergeProps } from "@react-dive-ui/merge-props";

type PanelProps = Omit<ComponentPropsWithoutRef<typeof dive.div>, "value"> & {
  value: string;
};
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { value, ...restProps } = props;
  const store = useTabsStore();
  const { getPanelProps } = store.props;

  const mergedProps = mergeProps(getPanelProps(value), restProps);
  return <dive.div {...mergedProps} ref={ref} />;
});

Panel.displayName = "Tabs.Panel";
