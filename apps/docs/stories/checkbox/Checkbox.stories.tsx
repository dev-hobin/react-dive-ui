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
  const { apis, service } = useCheckbox();
  return (
    <div>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          console.log(ev);
        }}
        onChange={(ev) => console.log(ev)}
      >
        <button type="button" onClick={() => apis.setIndeterminate()}>
          set indeterminate
        </button>
        <Checkbox.Provider service={service}>
          <Checkbox.Control>Control</Checkbox.Control>
          <Checkbox.Label>라벨</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Provider>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
