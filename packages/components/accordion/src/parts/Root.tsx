import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useAccordionContext } from "../accordion-provider";

type RootProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const context = useAccordionContext();

  const { rootProps } = context.props;
  return <dive.div {...rootProps} {...props} ref={ref} />;
});

Root.displayName = "Accordion.Root";
