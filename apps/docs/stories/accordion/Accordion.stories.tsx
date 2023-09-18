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
  const { state, service } = useAccordion({
    type: "single",
    items: [{ value: "value-1" }, { value: "value-2" }, { value: "value-3" }],
    initialExpanded: "value-1",
  });

  return (
    <Accordion.Provider service={service}>
      <Accordion.Root className={root}>
        {state.items.map((itemInfo) => (
          <Accordion.ItemProvider key={itemInfo.value} value={itemInfo.value}>
            <div className={item}>
              <Accordion.Heading className={heading}>
                <Accordion.Trigger className={trigger}>
                  {itemInfo.value}
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
        ))}
      </Accordion.Root>
    </Accordion.Provider>
  );
};
