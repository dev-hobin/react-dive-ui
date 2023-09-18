import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useItemValue } from "../item-value-provider";
import { connect } from "@react-dive-ui/accordion-machine";
import { useService } from "../service-provider";

type PanelProps = ComponentPropsWithoutRef<typeof dive.div> & {
  value?: string;
};
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const { value, ...restProps } = props;

  const service = useService();
  const itemValue = useItemValue() ?? value;

  if (!itemValue) {
    throw new Error("Accordion.Panel 컴포넌트는 value 속성을 필요로 합니다.");
  }

  const { getPanelProps } = connect(service);
  const panelProps = getPanelProps(itemValue);
  return <dive.div {...panelProps} {...restProps} ref={ref} />;
});

Panel.displayName = "Accordion.Panel";
