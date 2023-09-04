import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useAccordionStore } from "../providers/accordion";
import { useItem } from "../providers/item";

type HeadingProps = ComponentPropsWithoutRef<typeof dive.h3>;
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const store = useAccordionStore();
    const item = useItem();

    const { getHeadingProps } = store.props;

    const mergedProps = mergeProps(
      getHeadingProps(item.value, item.disabled),
      props
    );
    return <dive.h3 {...mergedProps} ref={ref} />;
  }
);

Heading.displayName = "Accordion.Heading";
