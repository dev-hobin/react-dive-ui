import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useAccordionStore } from "../providers/accordion";
import { ItemProvider } from "../providers/item";

type ItemProps = Omit<
  ComponentPropsWithoutRef<typeof dive.div>,
  "value" | "disabled"
> & {
  value: string;
  disabled?: boolean;
};
export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { value, disabled = false, ...restProps } = props;

  const store = useAccordionStore();
  const { getItemProps } = store.props;

  const mergedProps = mergeProps(getItemProps(value, disabled), restProps);
  return (
    <ItemProvider value={value} disabled={disabled}>
      <dive.div {...mergedProps} ref={ref} />
    </ItemProvider>
  );
});

Item.displayName = "Accordion.Item";
