import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { usePopoverContext } from "../popover-provider";
import { mergeProps } from "@react-dive-ui/merge-props";

type DescriptionProps = ComponentPropsWithoutRef<typeof dive.p>;
export const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
  (props, ref) => {
    const context = usePopoverContext();
    const { descriptionProps } = context.props;

    const mergedProps = mergeProps(descriptionProps, props);
    return <dive.p {...mergedProps} ref={ref} />;
  }
);

Description.displayName = "Popover.Description";
