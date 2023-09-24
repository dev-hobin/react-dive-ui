import type { Meta } from "@storybook/react";
import { RadioGroup, useRadioGroup, connect } from "@react-dive-ui/radio-group";

const meta = {
  title: "Component/RadioGroup",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

export const Default = () => {
  const { state, apis, service } = useRadioGroup();

  const { groupProps, getRadioProps, getHiddenInputProps, getLabelProps } =
    connect(service);

  return (
    <div {...groupProps}>
      <div data-part="item">
        <button {...getRadioProps()}>Radio 1</button>
        <input {...getHiddenInputProps()} />
        <label {...getLabelProps()}>아이템 1</label>
      </div>
      <div data-part="item">
        <button {...getRadioProps()}>Radio 2</button>
        <input {...getHiddenInputProps()} />
        <label {...getLabelProps()}>아이템 2</label>
      </div>
      <div data-part="item">
        <button {...getRadioProps()}>Radio 3</button>
        <input {...getHiddenInputProps()} />
        <label {...getLabelProps()}>아이템 3</label>
      </div>
    </div>
  );
};
