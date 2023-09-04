import { HTMLAttributes } from "react";
import { useAccordionStore } from "../providers/accordion";

export interface RootProps extends HTMLAttributes<HTMLDivElement> {}
export const Root = (props: RootProps) => {
  const store = useAccordionStore();
  const { rootProps } = store.props;
  return <div {...rootProps} {...props} />;
};
