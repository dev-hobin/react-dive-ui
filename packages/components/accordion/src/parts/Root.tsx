import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { useAccordionContext } from "../accordion-provider";

type RootProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const context = useAccordionContext();

  const { rootProps } = context.props;
  const mergedProps = mergeProps(rootProps, props);
  return <dive.div {...mergedProps} ref={ref} />;
});

Root.displayName = "Accordion.Root";
