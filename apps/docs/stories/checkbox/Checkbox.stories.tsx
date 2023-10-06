import type { Meta } from "@storybook/react";
import { Checkbox } from "@react-dive-ui/checkbox";
import { controlStyle, iconStyle, labelStyle } from "./style.css";
import { BsCheck } from "react-icons/bs";

const meta = {
  title: "Component/Checkbox",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

export const Default = () => {
  return (
    <Checkbox.Provider>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox.Control className={controlStyle}>
          <BsCheck className={iconStyle} />
        </Checkbox.Control>
        <Checkbox.Label className={labelStyle}>라벨 텍스트</Checkbox.Label>
        <Checkbox.HiddenInput />
      </div>
    </Checkbox.Provider>
  );
};
