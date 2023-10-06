import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useItem } from "../item-provider";
import { useAccordionContext } from "../accordion-provider";
import { mergeProps } from "@react-dive-ui/merge-props";

type HeadingProps = ComponentPropsWithoutRef<typeof dive.h3>;
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const context = useAccordionContext();
    const item = useItem();

    const { getHeadingProps } = context.props;
    const headingProps = getHeadingProps(item);

    const mergedProps = mergeProps(headingProps, props);
    return <dive.h3 {...mergedProps} ref={ref} />;
  }
);

Heading.displayName = "Accordion.Heading";
