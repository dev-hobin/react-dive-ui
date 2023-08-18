import { ComponentPropsWithoutRef, forwardRef, useLayoutEffect } from "react";
import { ItemProvider, useAccordionEvents, useProps } from "./providers";
import { dive } from "@react-dive-ui/dive";

type ItemProps = ComponentPropsWithoutRef<typeof dive.section> & {
  value: string;
};
export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { value, ...restProps } = props;
  const { registerItem, unregisterItem } = useAccordionEvents();
  const { getItemProps } = useProps();

  useLayoutEffect(() => {
    registerItem({ value, isDisabled: false });

    return () => {
      unregisterItem(value);
    };
  }, [registerItem, unregisterItem]);

  return (
    <ItemProvider value={value}>
      <dive.section {...restProps} {...getItemProps(value)} ref={ref} />
    </ItemProvider>
  );
});
Item.displayName = "Accordion.Item";
