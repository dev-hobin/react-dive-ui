import type { Meta } from "@storybook/react";
import { Accordion, useAccordion } from "@react-dive-ui/accordion";

const meta = {
  title: "Component/Accordion",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Accordion>;

export default meta;

export const AccordionTest = () => {
  const accordion = useAccordion({ id: "accordion", type: "single" });

  return (
    <Accordion.Provider store={accordion}>
      <Accordion.Root>
        <Accordion.Item value="value-1">
          <Accordion.Heading>
            <Accordion.Trigger>value-1 trigger</Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>value-1 panel</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="value-2">
          <Accordion.Heading>
            <Accordion.Trigger>value-2 trigger</Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>value-2 panel</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="value-3">
          <Accordion.Heading>
            <Accordion.Trigger>value-3 trigger</Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>value-3 panel</Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    </Accordion.Provider>
  );
};
