import { ComponentPropsWithoutRef, forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useProps } from "./providers";
import { mergeProps } from "@react-dive-ui/merge-props";

type ListProps = ComponentPropsWithoutRef<typeof dive.div>;
export const List = forwardRef<HTMLDivElement, ListProps>((props, ref) => {
  const { listProps } = useProps();
  const mergedProps = mergeProps(listProps, props);

  return <dive.div {...mergedProps} ref={ref} />;
});

List.displayName = "Tabs.List";
