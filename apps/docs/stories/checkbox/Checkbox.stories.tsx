import type { Meta } from "@storybook/react";
import { Checkbox } from "@react-dive-ui/checkbox";

const meta = {
  title: "Component/Checkbox",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

export const Default = () => {
  return <div></div>;
};
