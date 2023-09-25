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
  const { state: childState, service: childService } = useDialog();

  const { triggerProps, closeProps, panelProps } = connect(service);
  const {
    triggerProps: childTriggerProps,
    closeProps: childCloseProps,
    panelProps: childPanelProps,
  } = connect(childService);
  return (
    <div>
      <button {...triggerProps} className={css.trigger}>
        Trigger
      </button>

      {state.open &&
        createPortal(
          <>
            <div className={css.backdrop}></div>
            <div {...panelProps} className={css.panel}>
              <h2 data-part="title" className={css.title}>
                Title
              </h2>
              <p data-part="description" className={css.description}>
                description
              </p>
              <button {...childTriggerProps} className={css.trigger}>
                Child Trigger
              </button>
              {childState.open &&
                createPortal(
                  <>
                    <div className={css.backdrop}></div>
                    <div {...childPanelProps} className={css.panel}>
                      <h2 data-part="title" className={css.title}>
                        Title
                      </h2>
                      <p data-part="description" className={css.description}>
                        description
                      </p>

                      <p>Child Content</p>

                      <button {...childCloseProps} className={css.close}>
                        Child Close
                      </button>
                    </div>
                  </>,
                  document.body
                )}
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
