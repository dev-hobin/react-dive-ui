import type { Meta } from "@storybook/react";
import { Accordion } from "@react-dive-ui/accordion";
import {
  rootStyle,
  itemStyle,
  headingStyle,
  triggerStyle,
  panelStyle,
} from "./style.css";

const meta = {
  title: "Component/Accordion",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion.Provider>;

export default meta;

export const Single = () => {
  return (
    <Accordion.Provider type="single">
      <Accordion.Root className={rootStyle}>
        <Accordion.ItemProvider value="value-1">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 1
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-2">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 2
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-3">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 3
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
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

export const Multiple = () => {
  return (
    <Accordion.Provider type="multiple">
      <Accordion.Root className={rootStyle}>
        <Accordion.ItemProvider value="value-1">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 1
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-2">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 2
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-3">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 3
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
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

export const SingleCollapsible = () => {
  return (
    <Accordion.Provider type="single" collapsible>
      <Accordion.Root className={rootStyle}>
        <Accordion.ItemProvider value="value-1">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 1
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-2">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 2
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-3">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 3
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
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

export const SingleInitial = () => {
  return (
    <Accordion.Provider type="single" defaultValue="value-2">
      <Accordion.Root className={rootStyle}>
        <Accordion.ItemProvider value="value-1">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 1
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-2">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 2
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-3">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 3
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
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

export const MultipleInitial = () => {
  return (
    <Accordion.Provider type="multiple" defaultValue={["value-2", "value-3"]}>
      <Accordion.Root className={rootStyle}>
        <Accordion.ItemProvider value="value-1">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 1
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-2">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 2
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-3">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 3
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
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

export const Disabled = () => {
  return (
    <Accordion.Provider type="single">
      <Accordion.Root className={rootStyle}>
        <Accordion.ItemProvider value="value-1" disabled>
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 1
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-2">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 2
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              molestiae optio quas corrupti eum. Recusandae explicabo numquam
              fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
              repellat, ad nemo possimus.
            </Accordion.Panel>
          </div>
        </Accordion.ItemProvider>
        <Accordion.ItemProvider value="value-3">
          <div className={itemStyle}>
            <Accordion.Heading className={headingStyle}>
              <Accordion.Trigger className={triggerStyle}>
                아이템 3
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel className={panelStyle}>
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
