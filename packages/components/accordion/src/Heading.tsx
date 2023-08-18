import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { useItem, useProps } from "./providers";

type HeadingProps = ComponentPropsWithoutRef<typeof dive.h3>;
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const item = useItem();
    const { getHeadingProps } = useProps();
    const mergedProps = mergeProps(getHeadingProps(item.value), props);

    return <dive.h3 {...mergedProps} ref={ref} />;
  }
);
Heading.displayName = "Accordion.Heading";
