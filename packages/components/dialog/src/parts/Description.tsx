import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useDialogContext } from "../dialog-provider";
import { mergeProps } from "@react-dive-ui/merge-props";

type DescriptionProps = ComponentPropsWithoutRef<typeof dive.p>;
export const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
  (props, ref) => {
    const context = useDialogContext();
    const { descriptionProps } = context.props;

    const mergedProps = mergeProps(descriptionProps, props);
    return <dive.p {...mergedProps} ref={ref} />;
  }
);

Description.displayName = "Dialog.Description";
