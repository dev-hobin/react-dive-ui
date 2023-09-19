import type { Meta } from "@storybook/react";
import { Checkbox, useCheckbox } from "@react-dive-ui/checkbox";
import { controlStyle, iconStyle, labelStyle } from "./style.css";
import { BsCheck } from "react-icons/bs";

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
    <div style={{ display: "flex", alignItems: "center" }}>
      <Checkbox.Provider service={service}>
        <Checkbox.Control className={controlStyle}>
          <BsCheck className={iconStyle} />
        </Checkbox.Control>
        <Checkbox.Label className={labelStyle}>라벨 텍스트</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Provider>
    </div>
  );
};
