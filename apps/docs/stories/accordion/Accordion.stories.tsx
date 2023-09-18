import type { Meta } from "@storybook/react";
import { Accordion, useAccordion } from "@react-dive-ui/accordion";
import { root, item, heading, trigger, panel } from "./style.css";

const meta = {
  title: "Component/Accordion",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Accordion>;

export default meta;

export const Default = () => {
  const { state, service } = useAccordion();

  console.log(state);

  return (
    <Accordion.Provider service={service}>
      <Accordion.Root className={root}>
        <Accordion.ItemProvider value="value-1">
          <div className={item}>
            <Accordion.Heading className={heading}>
              <Accordion.Trigger className={trigger} value="value-1">
                아이템 1
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panel}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-2">
          <div className={item}>
            <Accordion.Heading className={heading}>
              <Accordion.Trigger className={trigger}>
                아이템 2
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panel}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-3">
          <div className={item}>
            <Accordion.Heading className={heading}>
              <Accordion.Trigger className={trigger}>
                아이템 3
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panel}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
      </Accordion.Root>
    </Accordion.Provider>
  );
};
