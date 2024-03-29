import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { useItem } from "../item-provider";
import { useAccordionContext } from "../accordion-provider";

type PanelProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const context = useAccordionContext();
  const item = useItem();

  const { getPanelProps } = context.props;
  const panelProps = getPanelProps(item);

  const mergedProps = mergeProps(panelProps, props);
  return <dive.div {...mergedProps} ref={ref} />;
});

Panel.displayName = "Accordion.Panel";
