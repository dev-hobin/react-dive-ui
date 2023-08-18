import type { Meta } from "@storybook/react";

import { Accordion, useAccordion } from "@react-dive-ui/accordion";

const meta = {
  title: "Component/Accordion",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Accordion>;

export default meta;

export const Uncontrolled = () => {
  return (
    <Accordion option={{ type: "single", defaultValue: "accordion-2" }}>
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
    </Accordion>
  );
};

export const Controlled = () => {
  const accordion = useAccordion({ type: "single" });

  return (
    <Accordion logic={accordion}>
      <Accordion.Item value="accordion-1" disabled>
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
    </Accordion>
  );
};
