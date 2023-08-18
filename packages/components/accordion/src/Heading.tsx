import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useProps } from "./providers/AccordionPropsProvider";

type HeadingProps = ComponentPropsWithoutRef<typeof dive.h3>;
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const { headingProps } = useProps();
    return <dive.h3 {...props} {...headingProps} ref={ref} />;
  }
);
Heading.displayName = "Accordion.Heading";
