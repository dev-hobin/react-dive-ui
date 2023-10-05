import type { Meta } from "@storybook/react";
import { Accordion, useAccordion, connect } from "@react-dive-ui/accordion";
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
} satisfies Meta<typeof Accordion>;

export default meta;

export const Default = () => {
  const { service } = useAccordion({
    type: "single",
    initialExpanded: "value-1",
    onChange: (details) => console.log(details),
  });

  const { rootProps, getHeadingProps, getTriggerProps, getPanelProps } =
    connect(service);

  return (
    <div {...rootProps} className={rootStyle}>
      <div className={itemStyle}>
        <h3 {...getHeadingProps({ value: "value-1" })} className={headingStyle}>
          <button
            {...getTriggerProps({ value: "value-1" })}
            className={triggerStyle}
          >
            아이템 1
          </button>
        </h3>
        <div {...getPanelProps({ value: "value-1" })} className={panelStyle}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
          molestiae optio quas corrupti eum. Recusandae explicabo numquam
          fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
          repellat, ad nemo possimus.
        </div>
      </div>
      <div className={itemStyle}>
        <h3 {...getHeadingProps({ value: "value-2" })} className={headingStyle}>
          <button
            {...getTriggerProps({ value: "value-2" })}
            className={triggerStyle}
          >
            아이템 2
          </button>
        </h3>
        <div {...getPanelProps({ value: "value-2" })} className={panelStyle}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
          molestiae optio quas corrupti eum. Recusandae explicabo numquam
          fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
          repellat, ad nemo possimus.
        </div>
      </div>
      <div className={itemStyle}>
        <h3 {...getHeadingProps({ value: "value-3" })} className={headingStyle}>
          <button
            {...getTriggerProps({ value: "value-3" })}
            className={triggerStyle}
          >
            아이템 3
          </button>
        </h3>
        <div {...getPanelProps({ value: "value-3" })} className={panelStyle}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
          molestiae optio quas corrupti eum. Recusandae explicabo numquam
          fugiat, eveniet aliquid inventore magni soluta velit ut, dolorem
          repellat, ad nemo possimus.
        </div>
      </div>
    </div>
  );
};
