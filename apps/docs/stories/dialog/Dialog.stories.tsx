import { useDialog, connect } from "@react-dive-ui/dialog";
import { createPortal } from "react-dom";
import * as css from "./style.css";

const meta = {
  title: "Component/Dialog",
  parameters: {
    layout: "centered",
  },
};

export default meta;

export const Default = () => {
  const { state, service } = useDialog({ initialOpen: true });

  const { triggerProps, closeProps } = connect(service);
  return (
    <div>
      <button {...triggerProps} className={css.trigger}>
        Trigger
      </button>

      {state.open &&
        createPortal(
          <>
            <div data-part="backdrop" className={css.backdrop}></div>
            <div data-part="panel" className={css.panel}>
              <h2 data-part="title" className={css.title}>
                Title
              </h2>
              <p data-part="description" className={css.description}>
                description
              </p>
              <button {...closeProps} className={css.close}>
                Close
              </button>
            </div>
          </>,
          document.body
        )}
    </div>
  );
};
