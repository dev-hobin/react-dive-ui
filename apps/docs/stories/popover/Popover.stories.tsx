import { connect, usePopover } from "@react-dive-ui/popover";
import { createPortal } from "react-dom";

const meta = {
  title: "Component/Popover",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default = () => {
  const { state, service } = usePopover();

  const { triggerProps, closeProps, arrowProps, panelProps } = connect(service);
  return (
    <div>
      <button {...triggerProps}>Toggle Popover</button>

      {state.status === "opened" &&
        createPortal(
          <article {...panelProps}>
            Popover Content
            <button {...arrowProps}>Close</button>
          </article>,
          document.body
        )}
    </div>
  );
};
