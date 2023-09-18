import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useItemValue } from "../item-value-provider";

type HeadingProps = ComponentPropsWithoutRef<typeof dive.h3> & {
  value?: string;
};
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const itemValue = useItemValue() ?? props.value;

    if (!itemValue) {
      throw new Error(
        "Accordion.Heading 컴포넌트는 value 속성을 필요로 합니다."
      );
    }
    return <dive.h3 {...props} ref={ref} />;
  }
);

Heading.displayName = "Accordion.Heading";
