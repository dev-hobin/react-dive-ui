import type { Meta } from "@storybook/react";

import { Tabs, useTabs } from "@react-dive-ui/tabs";

const meta = {
  title: "Component/Tabs",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tabs>;

export default meta;

export const Uncontrolled = () => {
  return (
    <Tabs option={{ defaultValue: "value-1", activationMode: "manual" }}>
      <Tabs.List>
        <Tabs.Trigger value="value-1">탭 1</Tabs.Trigger>
        <Tabs.Trigger value="value-2">탭 2</Tabs.Trigger>
        <Tabs.Trigger value="value-3">탭 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="value-1">컨텐츠 1</Tabs.Content>
      <Tabs.Content value="value-2">컨텐츠 2</Tabs.Content>
      <Tabs.Content value="value-3">컨텐츠 3</Tabs.Content>
    </Tabs>
  );
};

export const Controlled = () => {
  const tabs = useTabs({
    defaultValue: "value-1",
    disabledValues: ["value-2", "value-3"],
  });

  return (
    <Tabs logic={tabs}>
      <Tabs.List>
        <Tabs.Trigger value="value-1">탭 1</Tabs.Trigger>
        <Tabs.Trigger value="value-2">탭 2</Tabs.Trigger>
        <Tabs.Trigger value="value-3">탭 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="value-1">컨텐츠 1</Tabs.Content>
      <Tabs.Content value="value-2">컨텐츠 2</Tabs.Content>
      <Tabs.Content value="value-3">컨텐츠 3</Tabs.Content>
    </Tabs>
  );
};
