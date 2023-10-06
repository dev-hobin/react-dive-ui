import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useDialogContext } from "../dialog-provider";
import { mergeProps } from "@react-dive-ui/merge-props";

type TitleProps = ComponentPropsWithoutRef<typeof dive.h2>;
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (props, ref) => {
    const context = useDialogContext();
    const { titleProps } = context.props;

    const mergedProps = mergeProps(titleProps, props);
    return <dive.h2 {...mergedProps} ref={ref} />;
  }
);

Title.displayName = "Dialog.Title";
