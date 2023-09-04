import { HTMLAttributes } from "react";
import { useAccordionStore } from "../providers/accordion";
import { ItemProvider } from "../providers/item";

export interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}
export const Item = (props: ItemProps) => {
  const { value, disabled = false, ...restProps } = props;

  const store = useAccordionStore();

  const { getItemProps } = store.props;
  return (
    <ItemProvider value={value} disabled={disabled}>
      <div {...getItemProps(value, disabled)} {...restProps} />
    </ItemProvider>
  );
};
