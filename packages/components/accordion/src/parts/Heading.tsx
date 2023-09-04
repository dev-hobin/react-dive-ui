import { HTMLAttributes } from "react";
import { useAccordionStore } from "../providers/accordion";
import { useItem } from "../providers/item";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {}
export const Heading = (props: HeadingProps) => {
  const store = useAccordionStore();
  const item = useItem();

  const { getHeadingProps } = store.props;
  return <div {...getHeadingProps(item.value, item.disabled)} {...props} />;
};
