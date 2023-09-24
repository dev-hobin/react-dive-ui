import type { Meta } from "@storybook/react";
import { RadioGroup, useRadioGroup, connect } from "@react-dive-ui/radio-group";
import * as css from "./style.css";

const meta = {
  title: "Component/RadioGroup",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

const VALUE_TO_LABEL: Record<string, string> = {
  apple: "사과",
  banana: "바나나",
  orange: "오렌지",
};

export const Default = () => {
  const { state, service } = useRadioGroup({
    items: [{ value: "apple" }, { value: "banana" }, { value: "orange" }],
  });

  const { groupProps, getRadioProps, getIndicatorProps, getLabelProps } =
    connect(service);
  return (
    <div {...groupProps} className={css.group}>
      {state.items.map((item) => (
        <div key={item.value} className={css.item}>
          <button {...getRadioProps(item.value)} className={css.radio}>
            <span
              {...getIndicatorProps(item.value)}
              className={css.indicator}
            />
          </button>
          <label {...getLabelProps(item.value)} className={css.label}>
            {VALUE_TO_LABEL[item.value]}
          </label>
        </div>
      ))}
    </div>
  );
};
