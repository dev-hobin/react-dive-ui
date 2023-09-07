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
  const radioGroup = useRadioGroup({ id: "radio-group" });
  return (
    <RadioGroup.Provider store={radioGroup}>
      <RadioGroup.Group>
        <div>
          <RadioGroup.Radio value="value-1" labelled>
            <RadioGroup.Indicator>Radio</RadioGroup.Indicator>
          </RadioGroup.Radio>
          <RadioGroup.Label value="value-1">value-1 label</RadioGroup.Label>
        </div>
        <div>
          <RadioGroup.Radio value="value-2">
            <RadioGroup.Indicator>Radio</RadioGroup.Indicator>
          </RadioGroup.Radio>
          <RadioGroup.Label value="value-2">value-2 label</RadioGroup.Label>
        </div>
        <div>
          <RadioGroup.Radio value="value-3">
            <RadioGroup.Indicator>Radio</RadioGroup.Indicator>
          </RadioGroup.Radio>
          <RadioGroup.Label value="value-3">value-3 label</RadioGroup.Label>
        </div>
      </RadioGroup.Group>
    </RadioGroup.Provider>
  );
};
