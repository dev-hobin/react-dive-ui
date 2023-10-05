import type { Meta } from "@storybook/react";
import { Tabs } from "@react-dive-ui/tabs";
import { root, list, trigger, panel } from "./style.css";

const meta = {
  title: "Component/Tabs",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tabs>;

export default meta;

export const Default = () => {
  return (
    <Tabs.Provider defaultValue="value-1" activationMode="manual">
      <Tabs.Root className={root}>
        <Tabs.List className={list}>
          <Tabs.Trigger className={trigger} value="value-1">
            Tab - 1
          </Tabs.Trigger>
          <Tabs.Trigger className={trigger} value="value-2">
            Tab - 2
          </Tabs.Trigger>
          <Tabs.Trigger className={trigger} value="value-3">
            Tab - 3
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panel className={panel} value="value-1">
          Panel 1
        </Tabs.Panel>
        <Tabs.Panel className={panel} value="value-2">
          Panel 2
        </Tabs.Panel>
        <Tabs.Panel className={panel} value="value-3">
          Panel 3
        </Tabs.Panel>
      </Tabs.Root>
    </Tabs.Provider>
  );
};
