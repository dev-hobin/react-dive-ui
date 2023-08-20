import { forwardRef } from "react";
import { dive } from "@react-dive-ui/dive";
import { useTabs } from "./useTabs";
import { useTabsProps } from "./useTabsProps";
import { mergeProps } from "@react-dive-ui/merge-props";

import type { TabsOption, UseTabsReturn } from "./useTabs";
import type { ComponentPropsWithoutRef } from "react";
import {
  TabsEventsProvider,
  TabsPropsProvider,
  TabsStateProvider,
} from "./providers";

type CommonProps = ComponentPropsWithoutRef<typeof dive.div>;
type ControlledOrUncontrolledProps =
  | {
      logic?: never;
      option: TabsOption;
    }
  | {
      logic: UseTabsReturn;
      option?: never;
    };
type RootProps = CommonProps & ControlledOrUncontrolledProps;
export const Root = forwardRef<HTMLDivElement, RootProps>((props, ref) => {
  const { logic, option, ...restProps } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tabs = logic ?? useTabs(option);
  const componentProps = useTabsProps(tabs);

  const mergedProps = mergeProps(componentProps.rootProps, restProps);

  return (
    <TabsEventsProvider value={tabs.events}>
      <TabsStateProvider value={tabs.state}>
        <TabsPropsProvider value={componentProps}>
          <dive.div {...mergedProps} ref={ref} />
        </TabsPropsProvider>
      </TabsStateProvider>
    </TabsEventsProvider>
  );
});

Root.displayName = "Tabs.Root";
