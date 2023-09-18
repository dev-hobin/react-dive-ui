import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useItemValue } from "../item-value-provider";

type PanelProps = ComponentPropsWithoutRef<typeof dive.div> & {
  value?: string;
};
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const itemValue = useItemValue() ?? props.value;

  if (!itemValue) {
    throw new Error("Accordion.Panel 컴포넌트는 value 속성을 필요로 합니다.");
  }
  return <dive.div {...props} ref={ref} />;
});

Panel.displayName = "Accordion.Panel";
