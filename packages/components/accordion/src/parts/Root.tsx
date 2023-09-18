import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { connect } from "@react-dive-ui/accordion-machine";
import { useService } from "../service-provider";

type RootProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const service = useService();

  const { rootProps } = connect(service);
  return <dive.div {...rootProps} {...props} ref={ref} />;
});

Root.displayName = "Accordion.Root";
