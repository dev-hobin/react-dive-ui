import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useAccordionStore } from "../providers/accordion";
import { useItem } from "../providers/item";

type PanelProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const store = useAccordionStore();
  const item = useItem();

  const { getPanelProps } = store.props;
  return (
    <dive.div
      {...getPanelProps(item.value, item.disabled)}
      {...props}
      ref={ref}
    />
  );
});

Panel.displayName = "Accordion.Panel";
