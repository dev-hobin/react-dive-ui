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
  const { state, service } = useDialog();

  const { triggerProps, closeProps, panelProps, titleProps, descriptionProps } =
    connect(service);

  return (
    <div>
      <button {...triggerProps} className={css.trigger}>
        Open Dialog
      </button>

      {state.open &&
        createPortal(
          <>
            <div className={css.backdrop}></div>
            <article {...panelProps} className={css.panel}>
              <h2 {...titleProps} className={css.title}>
                Dialog Title
              </h2>
              <p {...descriptionProps} className={css.description}>
                Dialog Description
              </p>
              <footer className={css.footer}>
                <button {...closeProps} className={css.close}>
                  OK
                </button>
              </footer>
            </article>
          </>,
          document.body
        )}
    </div>
  );
};
