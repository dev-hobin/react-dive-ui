import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useAccordionStore } from "../providers/accordion";

type RootProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const store = useAccordionStore();
  const { rootProps } = store.props;

  const mergedProps = mergeProps(rootProps, props);
  return <dive.div {...mergedProps} ref={ref} />;
});

Root.displayName = "Accordion.Root";
