import { ComponentPropsWithoutRef, forwardRef } from "react";
import { ItemProvider, useProps } from "./providers";
import { dive } from "@react-dive-ui/dive";

type ItemProps = ComponentPropsWithoutRef<typeof dive.section> & {
  value: string;
};
export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { value, ...restProps } = props;
  const { getItemProps } = useProps();

  return (
    <ItemProvider value={value}>
      <dive.section {...restProps} {...getItemProps(value)} ref={ref} />
    </ItemProvider>
  );
});
Item.displayName = "Accordion.Item";
