import { HTMLAttributes } from "react";
import { useAccordionStore } from "../providers/accordion";
import { useItem } from "../providers/item";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {}
export const Panel = (props: PanelProps) => {
  const store = useAccordionStore();
  const item = useItem();

  const { getPanelProps } = store.props;
  return <div {...getPanelProps(item.value, item.disabled)} {...props} />;
};
