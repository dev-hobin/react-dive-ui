import type { Meta } from "@storybook/react";
import { RadioGroup, useRadioGroup } from "@react-dive-ui/radio-group";

const meta = {
  title: "Component/RadioGroup",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

export const Default = () => {
  const radioGroup = useRadioGroup();

  return <RadioGroup.Group>TEST</RadioGroup.Group>;
};
