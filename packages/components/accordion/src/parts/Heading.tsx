import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useItem } from "../item-provider";
import { connect } from "@react-dive-ui/accordion-machine";
import { useService } from "../service-provider";

type HeadingProps = ComponentPropsWithoutRef<typeof dive.h3>;
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const service = useService();
    const item = useItem();

    const { getHeadingProps } = connect(service);

    const headingProps = getHeadingProps(item);
    return <dive.h3 {...headingProps} {...props} ref={ref} />;
  }
);

Heading.displayName = "Accordion.Heading";
