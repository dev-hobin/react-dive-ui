import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useAccordionState, useItem, useProps } from "./providers";

type ContentProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    const item = useItem();
    const state = useAccordionState();
    const { contentProps } = useProps();

    const isOpen = state.value.includes(item.value);

    if (!isOpen) return;
    return <dive.div {...props} {...contentProps} ref={ref} />;
  }
);
Content.displayName = "Accordion.Content";
