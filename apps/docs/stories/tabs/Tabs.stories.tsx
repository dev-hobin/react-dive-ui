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
  const tabs = useTabs();

  return (
    <Tabs.Root className={root}>
      <Tabs.List className={list}>
        <Tabs.Trigger className={trigger}>Tab - 1</Tabs.Trigger>
        <Tabs.Trigger className={trigger}>Tab - 2</Tabs.Trigger>
        <Tabs.Trigger className={trigger}>Tab - 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel className={panel}>Panel 1</Tabs.Panel>
      <Tabs.Panel className={panel}>Panel 2</Tabs.Panel>
      <Tabs.Panel className={panel}>Panel 3</Tabs.Panel>
    </Tabs.Root>
  );
};
