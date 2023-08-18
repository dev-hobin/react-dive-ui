import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useItem, useProps } from "./providers";

type HeadingProps = ComponentPropsWithoutRef<typeof dive.h3>;
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const item = useItem();
    const { getHeadingProps } = useProps();

    return <dive.h3 {...props} {...getHeadingProps(item.value)} ref={ref} />;
  }
);
Heading.displayName = "Accordion.Heading";
