import type { Meta } from "@storybook/react";
import { Tabs, useTabs } from "@react-dive-ui/tabs";
import { root, list, trigger, panel } from "./style.css";

const meta = {
  title: "Component/Tabs",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tabs>;

export default meta;

export const Default = () => {
  const tabs = useTabs({
    id: "tabs",
    defaultValue: "tab-1",
  });

  return (
    <Tabs.Provider store={tabs}>
      <Tabs.Root className={root}>
        <Tabs.List className={list}>
          <Tabs.Trigger value="tab-1" className={trigger}>
            Tab - 1
          </Tabs.Trigger>
          <Tabs.Trigger value="tab-2" className={trigger}>
            Tab - 2
          </Tabs.Trigger>
          <Tabs.Trigger value="tab-3" className={trigger}>
            Tab - 3
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panel value="tab-1" className={panel}>
          Panel 1
        </Tabs.Panel>
        <Tabs.Panel value="tab-2" className={panel}>
          Panel 2
        </Tabs.Panel>
        <Tabs.Panel value="tab-3" className={panel}>
          Panel 3
        </Tabs.Panel>
      </Tabs.Root>
    </Tabs.Provider>
  );
};
