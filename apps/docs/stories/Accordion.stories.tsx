import type { Meta } from "@storybook/react";

import { Accordion } from "@react-dive-ui/accordion";

const meta = {
  title: "Component/Accordion",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Accordion>;

export default meta;

export const AccordionTest = () => {
  return <Accordion />;
};
