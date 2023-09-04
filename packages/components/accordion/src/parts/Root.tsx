import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useAccordionStore } from "../providers/accordion";

type RootProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const store = useAccordionStore();
  const { rootProps } = store.props;
  return <dive.div {...rootProps} {...props} ref={ref} />;
});

Root.displayName = "Accordion.Root";
