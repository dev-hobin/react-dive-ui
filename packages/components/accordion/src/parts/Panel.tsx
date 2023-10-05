import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useItem } from "../item-provider";
import { connect } from "@react-dive-ui/accordion-machine";
import { useService } from "../service-provider";

type PanelProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const service = useService();
  const item = useItem();

  const { getPanelProps } = connect(service);
  const panelProps = getPanelProps(item);

  return <dive.div {...panelProps} {...props} ref={ref} />;
});

Panel.displayName = "Accordion.Panel";
