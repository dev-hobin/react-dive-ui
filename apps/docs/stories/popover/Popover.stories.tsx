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
  const { state, service } = usePopover({
    floatingOptions: {
      offset: 12,
      shiftPadding: 12,
      placement: "right-start",
      arrowLength: 4,
    },
  });

  const {
    triggerProps,
    closeProps,
    arrowProps,
    panelProps,
    titleProps,
    descriptionProps,
  } = connect(service);
  return (
    <div>
      <button {...triggerProps}>Toggle Popover</button>

      {state.status === "opened" &&
        createPortal(
          <article {...panelProps}>
            <h2 {...titleProps}>Title</h2>
            <p {...descriptionProps}>Description</p>
            <button {...closeProps}>Close</button>
            <div
              {...arrowProps}
              style={{
                ...arrowProps.style,
                "--arrow-size-x": "10px",
                "--arrow-size-y": "10px",
              }}
            />
          </article>,
          document.body
        )}
    </div>
  );
};
