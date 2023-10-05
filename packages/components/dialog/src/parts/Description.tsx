import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useDialogContext } from "../dialog-provider";

type DescriptionProps = ComponentPropsWithoutRef<typeof dive.p>;
export const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
  (props, ref) => {
    const context = useDialogContext();

    const { descriptionProps } = context.props;
    return <dive.p {...descriptionProps} {...props} ref={ref} />;
  }
);

Description.displayName = "Dialog.Description";
