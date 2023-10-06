import type { Meta } from "@storybook/react";
import { Checkbox } from "@react-dive-ui/checkbox";
import { controlStyle, iconStyle, labelStyle } from "./style.css";
import { BsCheck } from "react-icons/bs";
import { useState } from "react";

const meta = {
  title: "Component/Checkbox",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox.Provider>;

export default meta;

export const Default = () => {
  return (
    <Checkbox.Provider>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox.Control className={controlStyle}>
          <BsCheck className={iconStyle} />
        </Checkbox.Control>
        <Checkbox.Label className={labelStyle}>라벨 텍스트</Checkbox.Label>
      </div>
    </Checkbox.Provider>
  );
};

export const Disabled = () => {
  return (
    <Checkbox.Provider disabled>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox.Control className={controlStyle}>
          <BsCheck className={iconStyle} />
        </Checkbox.Control>
        <Checkbox.Label className={labelStyle}>라벨 텍스트</Checkbox.Label>
      </div>
    </Checkbox.Provider>
  );
};

export const WithForm = () => {
  const [submitted, setSubmitted] = useState<Record<string, string>>();
  const [changed, setChanged] = useState<[string, boolean]>();
  return (
    <>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          const result: Record<string, string> = {};
          const formData = new FormData(ev.currentTarget);
          formData.forEach((value, key) => {
            result[key] = value.toString();
          });
          setSubmitted(result);
        }}
        onChange={(ev) => {
          ev.preventDefault();
          const el = ev.target as HTMLInputElement;
          const name = el?.name;
          const checked = el?.checked;
          if (name == null || checked == null) {
            setChanged(undefined);
          } else {
            setChanged([name, checked]);
          }
        }}
      >
        <Checkbox.Provider form={{ name: "checkbox" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox.Control className={controlStyle}>
              <BsCheck className={iconStyle} />
            </Checkbox.Control>
            <Checkbox.Label className={labelStyle}>라벨 텍스트</Checkbox.Label>
            <Checkbox.HiddenInput />
          </div>
        </Checkbox.Provider>

        <button type="submit" style={{ marginTop: "1rem" }}>
          제출하기
        </button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        {submitted && <p>제출 결과: {JSON.stringify(submitted, null, 2)}</p>}
        {changed && <p>변경 발생: {JSON.stringify(changed, null, 2)}</p>}
      </div>
    </>
  );
};

export const RequiredForm = () => {
  const [submitted, setSubmitted] = useState<Record<string, string>>();
  const [changed, setChanged] = useState<[string, boolean]>();
  return (
    <>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          const result: Record<string, string> = {};
          const formData = new FormData(ev.currentTarget);
          formData.forEach((value, key) => {
            result[key] = value.toString();
          });
          setSubmitted(result);
        }}
        onChange={(ev) => {
          ev.preventDefault();
          const el = ev.target as HTMLInputElement;
          const name = el?.name;
          const checked = el?.checked;
          if (name == null || checked == null) {
            setChanged(undefined);
          } else {
            setChanged([name, checked]);
          }
        }}
      >
        <Checkbox.Provider form={{ name: "checkbox", required: true }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox.HiddenInput />
            <Checkbox.Control className={controlStyle}>
              <BsCheck className={iconStyle} />
            </Checkbox.Control>
            <Checkbox.Label className={labelStyle}>라벨 텍스트</Checkbox.Label>
          </div>
        </Checkbox.Provider>

        <button type="submit" style={{ marginTop: "1rem" }}>
          제출하기
        </button>
      </form>

      <div style={{ marginTop: "1rem" }}>
        {submitted && <p>제출 결과: {JSON.stringify(submitted, null, 2)}</p>}
        {changed && <p>변경 발생: {JSON.stringify(changed, null, 2)}</p>}
      </div>
    </>
  );
};
