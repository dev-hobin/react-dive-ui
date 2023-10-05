import type { Meta } from "@storybook/react";
import { RadioGroup, useRadioGroup } from "@react-dive-ui/radio-group";
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
  const { props } = useRadioGroup();

  const { groupProps, getRadioProps, getIndicatorProps, getLabelProps } = props;
  return (
    <div {...groupProps} className={css.group}>
      <div className={css.item}>
        <button {...getRadioProps({ value: "apple" })} className={css.radio}>
          <span
            {...getIndicatorProps({ value: "apple" })}
            className={css.indicator}
          />
        </button>
        <label {...getLabelProps({ value: "apple" })} className={css.label}>
          {VALUE_TO_LABEL["apple"]}
        </label>
      </div>
      <div className={css.item}>
        <button {...getRadioProps({ value: "banana" })} className={css.radio}>
          <span
            {...getIndicatorProps({ value: "banana" })}
            className={css.indicator}
          />
        </button>
        <label {...getLabelProps({ value: "banana" })} className={css.label}>
          {VALUE_TO_LABEL["banana"]}
        </label>
      </div>
      <div className={css.item}>
        <button {...getRadioProps({ value: "orange" })} className={css.radio}>
          <span
            {...getIndicatorProps({ value: "orange" })}
            className={css.indicator}
          />
        </button>
        <label {...getLabelProps({ value: "orange" })} className={css.label}>
          {VALUE_TO_LABEL["orange"]}
        </label>
      </div>
    </div>
  );
};
