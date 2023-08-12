import { ComponentPropsWithoutRef, forwardRef } from "react";
import { ItemProvider } from "./providers";
import { dive } from "@react-dive-ui/dive";

type ItemProps = ComponentPropsWithoutRef<typeof dive.div> & { value: string };
export const Item = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { value, ...restProps } = props;
  return (
    <ItemProvider value={value}>
      <dive.section {...restProps} ref={ref} />
    </ItemProvider>
  );
});
Item.displayName = "Accordion.Item";
