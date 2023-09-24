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
  const { state, service } = useRadioGroup({
    items: [{ value: "value-1" }, { value: "value-2" }, { value: "value-3" }],
  });

  const { groupProps, getRadioProps, getLabelProps } = connect(service);
  return (
    <div {...groupProps}>
      {state.items.map((item) => (
        <div key={item.value} data-part="item">
          <button {...getRadioProps(item.value)}>Radio</button>
          {/* <input {...getHiddenInputProps()} /> */}
          <label {...getLabelProps()}>{item.value}</label>
        </div>
      ))}
    </div>
  );
};
