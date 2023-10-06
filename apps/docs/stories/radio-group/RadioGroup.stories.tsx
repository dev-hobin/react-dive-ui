import type { Meta } from "@storybook/react";
import { RadioGroup } from "@react-dive-ui/radio-group";

import * as css from "./style.css";

const meta = {
  title: "Component/RadioGroup",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;

const VALUE_TO_LABEL: Record<string, string> = {
  apple: "사과",
  banana: "바나나",
  orange: "오렌지",
};

export const Default = () => {
  return (
    <RadioGroup.Provider>
      <RadioGroup.Group className={css.group}>
        <RadioGroup.ItemProvider value="apple">
          <div className={css.item}>
            <RadioGroup.Radio className={css.radio}>
              <RadioGroup.Indicator className={css.indicator} />
            </RadioGroup.Radio>
            <RadioGroup.Label className={css.label}>
              {VALUE_TO_LABEL["apple"]}
            </RadioGroup.Label>
          </div>
        </RadioGroup.ItemProvider>
        <RadioGroup.ItemProvider value="banana">
          <div className={css.item}>
            <RadioGroup.Radio className={css.radio}>
              <RadioGroup.Indicator className={css.indicator} />
            </RadioGroup.Radio>
            <RadioGroup.Label className={css.label}>
              {VALUE_TO_LABEL["banana"]}
            </RadioGroup.Label>
          </div>
        </RadioGroup.ItemProvider>
        <RadioGroup.ItemProvider value="orange">
          <div className={css.item}>
            <RadioGroup.Radio className={css.radio}>
              <RadioGroup.Indicator className={css.indicator} />
            </RadioGroup.Radio>
            <RadioGroup.Label className={css.label}>
              {VALUE_TO_LABEL["orange"]}
            </RadioGroup.Label>
          </div>
        </RadioGroup.ItemProvider>
      </RadioGroup.Group>
    </RadioGroup.Provider>
  );
};
