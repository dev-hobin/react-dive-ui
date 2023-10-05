import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { usePopoverContext } from "../popover-provider";

type TitleProps = ComponentPropsWithoutRef<typeof dive.h2>;
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (props, ref) => {
    const context = usePopoverContext();

    const { titleProps } = context.props;
    return <dive.h2 {...titleProps} {...props} ref={ref} />;
  }
);

Title.displayName = "Popover.Title";
