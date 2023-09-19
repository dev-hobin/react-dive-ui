import type { Meta } from "@storybook/react";
import { Checkbox, useCheckbox } from "@react-dive-ui/checkbox";

const meta = {
  title: "Component/Checkbox",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

export const Default = () => {
  const { service } = useCheckbox();
  return (
    <div>
      <form onChange={(ev) => console.log(ev)}>
        <Checkbox.Provider service={service}>
          <Checkbox.Control>Control</Checkbox.Control>
          <Checkbox.Label>라벨</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Provider>
      </form>
    </div>
  );
};
