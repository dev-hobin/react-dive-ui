import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useItemValue } from "../item-value-provider";
import { connect } from "@react-dive-ui/accordion-machine";
import { useService } from "../service-provider";

type HeadingProps = ComponentPropsWithoutRef<typeof dive.h3> & {
  value?: string;
};
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    const { value, ...restProps } = props;

    const service = useService();
    const itemValue = useItemValue() ?? value;

    if (!itemValue) {
      throw new Error(
        "Accordion.Heading 컴포넌트는 value 속성을 필요로 합니다."
      );
    }

    const { getHeadingProps } = connect(service);
    const headingProps = getHeadingProps(itemValue);
    return <dive.h3 {...headingProps} {...restProps} ref={ref} />;
  }
);

Heading.displayName = "Accordion.Heading";
