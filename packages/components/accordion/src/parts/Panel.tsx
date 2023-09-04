import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useAccordionStore } from "../providers/accordion";
import { useItem } from "../providers/item";

type PanelProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Panel = forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
  const store = useAccordionStore();
  const item = useItem();

  const { getPanelProps } = store.props;

  const mergedProps = mergeProps(
    getPanelProps(item.value, item.disabled),
    props
  );
  return <dive.div {...mergedProps} ref={ref} />;
});

Panel.displayName = "Accordion.Panel";
