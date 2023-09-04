import { ButtonHTMLAttributes } from "react";
import { useAccordionStore } from "../providers/accordion";
import { useItem } from "../providers/item";

export interface TriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const Trigger = (props: TriggerProps) => {
  const store = useAccordionStore();
  const item = useItem();

  const { getTriggerProps } = store.props;
  return <button {...getTriggerProps(item.value, item.disabled)} {...props} />;
};
