import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { mergeProps } from "@react-dive-ui/merge-props";
import { useAccordionState, useItem, useProps } from "./providers";

type ContentProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    const item = useItem();
    const state = useAccordionState();
    const { getContentProps } = useProps();
    const mergedProps = mergeProps(getContentProps(item.value), props);

    const isOpen = state.value.includes(item.value);

    if (!isOpen) return;
    return <dive.div {...mergedProps} ref={ref} />;
  }
);
Content.displayName = "Accordion.Content";
