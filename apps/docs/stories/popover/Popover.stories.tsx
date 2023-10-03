import { connect, usePopover } from "@react-dive-ui/popover";
import { createPortal } from "react-dom";
import * as css from "./style.css";

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
      placement: "bottom-start",
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
      <button {...triggerProps} className={css.trigger}>
        Toggle Popover
      </button>

      {state.status === "opened" &&
        createPortal(
          <article {...panelProps} className={css.panel}>
            <h2 {...titleProps} className={css.title}>
              About Popover
            </h2>
            <p {...descriptionProps} className={css.description}>
              Popovers are perfect for floating panels with arbitrary content
              like navigation menus, mobile menus and flyout menus.
            </p>
            <button {...closeProps} className={css.close}>
              Close
            </button>
            <div {...arrowProps} className={css.arrow} />
          </article>,
          document.body
        )}
    </div>
  );
};
