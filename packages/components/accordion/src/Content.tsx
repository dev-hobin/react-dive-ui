import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useAccordionState, useItem } from "./providers";

type ContentProps = ComponentPropsWithoutRef<typeof dive.div>;
export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    const { value } = useAccordionState();
    const item = useItem();

    const isOpen = value.includes(item.value);

    if (!isOpen) return null;
    return <dive.div {...props} ref={ref} />;
  }
);
Content.displayName = "Accordion.Content";
