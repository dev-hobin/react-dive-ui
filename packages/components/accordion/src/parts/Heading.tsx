import { dive } from "@react-dive-ui/dive";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useAccordionStore } from "../providers/accordion";
import { useItem } from "../providers/item";

type HeadingProps = ComponentPropsWithoutRef<typeof dive.h3>;
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const store = useAccordionStore();
    const item = useItem();

    const { getHeadingProps } = store.props;
    return (
      <dive.h3
        {...getHeadingProps(item.value, item.disabled)}
        {...props}
        ref={ref}
      />
    );
  }
);

Heading.displayName = "Accordion.Heading";
