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
    items: [
      { value: "value-1", disabled: true },
      { value: "value-2" },
      { value: "value-3" },
    ],
    defaultValue: "value-1",
    disabled: true,
  });

  const { groupProps, getRadioProps, getLabelProps } = connect(service);
  return (
    <div>
      <code>{JSON.stringify(state, null, 2)}</code>
      <div {...groupProps}>
        {state.items.map((item) => (
          <div key={item.value} data-part="item">
            <button {...getRadioProps(item.value)}>Radio</button>
            {/* <input {...getHiddenInputProps()} /> */}
            <label {...getLabelProps(item.value)}>{item.value}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
