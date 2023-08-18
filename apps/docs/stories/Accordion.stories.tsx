import type { Meta, StoryFn, StoryObj } from "@storybook/react";

import * as Accordion from "@react-dive-ui/accordion";

const meta = {
  title: "Component/Accordion",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Accordion.Root>;

export default meta;

type Story = StoryObj<typeof Accordion.Root>;

export const Uncontrolled: Story = {
  render: (args) => (
    <Accordion.Root option={{ type: "single", defaultValue: "accordion-2" }}>
      <Accordion.Item value="accordion-1">
        <Accordion.Heading>
          <Accordion.Trigger>트리거 1</Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Content>컨텐츠 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-2">
        <Accordion.Heading>
          <Accordion.Trigger>트리거 2</Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Content>컨텐츠 2</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="accordion-3">
        <Accordion.Heading>
          <Accordion.Trigger>트리거 3</Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Content>컨텐츠 3</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
};
