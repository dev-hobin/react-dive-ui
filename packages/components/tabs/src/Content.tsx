import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";

type CommonProps = ComponentPropsWithoutRef<typeof dive.div>;
type ContentProps = CommonProps;
export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    return <dive.div {...props} ref={ref} />;
  }
);

Content.displayName = "Tabs.Content";
