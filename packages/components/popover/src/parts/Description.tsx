import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { usePopoverContext } from "../popover-provider";

type DescriptionProps = ComponentPropsWithoutRef<typeof dive.p>;
export const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
  (props, ref) => {
    const context = usePopoverContext();

    const { descriptionProps } = context.props;
    return <dive.p {...descriptionProps} {...props} ref={ref} />;
  }
);

Description.displayName = "Popover.Description";
