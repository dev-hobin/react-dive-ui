import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useProps } from "./providers";
import { mergeProps } from "@react-dive-ui/merge-props";

type ContentProps = ComponentPropsWithoutRef<typeof dive.div> & {
  value: string;
};
export const Content = forwardRef<HTMLDivElement, ContentProps>(
  (props, ref) => {
    const { value, ...restProps } = props;
    const { getContentProps } = useProps();
    const contentProps = getContentProps(value);
    const mergedProps = mergeProps(contentProps, restProps);

    return <dive.div {...mergedProps} ref={ref} />;
  }
);

Content.displayName = "Tabs.Content";
