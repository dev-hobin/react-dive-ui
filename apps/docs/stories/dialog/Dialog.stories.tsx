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

const Child = () => {
  const { state: childState, service: childService } = useDialog({
    id: "child",
    type: "modal",
  });

  const {
    triggerProps: childTriggerProps,
    closeProps: childCloseProps,
    panelProps: childPanelProps,
  } = connect(childService);

  return (
    <>
      <button {...childTriggerProps} className={css.trigger}>
        Child Trigger
      </button>
      {childState.open &&
        createPortal(
          <>
            {/* <div className={css.backdrop}></div> */}
            <div
              {...childPanelProps}
              className={css.panel}
              style={{ width: 100 }}
            >
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
    </>
  );
};

export const Default = () => {
  const { state, service } = useDialog({ type: "modal", id: "parent" });

  const { triggerProps, closeProps, panelProps } = connect(service);
  return (
    <div>
      <button {...triggerProps} className={css.trigger}>
        Trigger
      </button>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, omnis
        blanditiis! Animi ea fugiat fuga rem, laudantium accusantium dignissimos
        laborum assumenda sed repellendus asperiores quos? Molestiae sequi
        assumenda animi sed quo hic nemo tempora qui maiores quam doloribus
        earum deleniti veritatis corrupti harum saepe error nisi numquam
        voluptatibus, neque accusamus quod placeat sint non. Voluptate, ipsum.
        Temporibus nam at suscipit ipsum eius, alias rerum perspiciatis, debitis
        a aliquam molestias corrupti, placeat error cum. Reiciendis dignissimos
        maxime quaerat commodi corporis nulla molestias vel dolorem, sunt vitae
        adipisci, repellendus nostrum possimus officia rerum dolorum, fuga totam
        ratione esse nam illum alias accusantium?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, omnis
        blanditiis! Animi ea fugiat fuga rem, laudantium accusantium dignissimos
        laborum assumenda sed repellendus asperiores quos? Molestiae sequi
        assumenda animi sed quo hic nemo tempora qui maiores quam doloribus
        earum deleniti veritatis corrupti harum saepe error nisi numquam
        voluptatibus, neque accusamus quod placeat sint non. Voluptate, ipsum.
        Temporibus nam at suscipit ipsum eius, alias rerum perspiciatis, debitis
        a aliquam molestias corrupti, placeat error cum. Reiciendis dignissimos
        maxime quaerat commodi corporis nulla molestias vel dolorem, sunt vitae
        adipisci, repellendus nostrum possimus officia rerum dolorum, fuga totam
        ratione esse nam illum alias accusantium?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, omnis
        blanditiis! Animi ea fugiat fuga rem, laudantium accusantium dignissimos
        laborum assumenda sed repellendus asperiores quos? Molestiae sequi
        assumenda animi sed quo hic nemo tempora qui maiores quam doloribus
        earum deleniti veritatis corrupti harum saepe error nisi numquam
        voluptatibus, neque accusamus quod placeat sint non. Voluptate, ipsum.
        Temporibus nam at suscipit ipsum eius, alias rerum perspiciatis, debitis
        a aliquam molestias corrupti, placeat error cum. Reiciendis dignissimos
        maxime quaerat commodi corporis nulla molestias vel dolorem, sunt vitae
        adipisci, repellendus nostrum possimus officia rerum dolorum, fuga totam
        ratione esse nam illum alias accusantium?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, omnis
        blanditiis! Animi ea fugiat fuga rem, laudantium accusantium dignissimos
        laborum assumenda sed repellendus asperiores quos? Molestiae sequi
        assumenda animi sed quo hic nemo tempora qui maiores quam doloribus
        earum deleniti veritatis corrupti harum saepe error nisi numquam
        voluptatibus, neque accusamus quod placeat sint non. Voluptate, ipsum.
        Temporibus nam at suscipit ipsum eius, alias rerum perspiciatis, debitis
        a aliquam molestias corrupti, placeat error cum. Reiciendis dignissimos
        maxime quaerat commodi corporis nulla molestias vel dolorem, sunt vitae
        adipisci, repellendus nostrum possimus officia rerum dolorum, fuga totam
        ratione esse nam illum alias accusantium?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, omnis
        blanditiis! Animi ea fugiat fuga rem, laudantium accusantium dignissimos
        laborum assumenda sed repellendus asperiores quos? Molestiae sequi
        assumenda animi sed quo hic nemo tempora qui maiores quam doloribus
        earum deleniti veritatis corrupti harum saepe error nisi numquam
        voluptatibus, neque accusamus quod placeat sint non. Voluptate, ipsum.
        Temporibus nam at suscipit ipsum eius, alias rerum perspiciatis, debitis
        a aliquam molestias corrupti, placeat error cum. Reiciendis dignissimos
        maxime quaerat commodi corporis nulla molestias vel dolorem, sunt vitae
        adipisci, repellendus nostrum possimus officia rerum dolorum, fuga totam
        ratione esse nam illum alias accusantium?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, omnis
        blanditiis! Animi ea fugiat fuga rem, laudantium accusantium dignissimos
        laborum assumenda sed repellendus asperiores quos? Molestiae sequi
        assumenda animi sed quo hic nemo tempora qui maiores quam doloribus
        earum deleniti veritatis corrupti harum saepe error nisi numquam
        voluptatibus, neque accusamus quod placeat sint non. Voluptate, ipsum.
        Temporibus nam at suscipit ipsum eius, alias rerum perspiciatis, debitis
        a aliquam molestias corrupti, placeat error cum. Reiciendis dignissimos
        maxime quaerat commodi corporis nulla molestias vel dolorem, sunt vitae
        adipisci, repellendus nostrum possimus officia rerum dolorum, fuga totam
        ratione esse nam illum alias accusantium?
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, omnis
        blanditiis! Animi ea fugiat fuga rem, laudantium accusantium dignissimos
        laborum assumenda sed repellendus asperiores quos? Molestiae sequi
        assumenda animi sed quo hic nemo tempora qui maiores quam doloribus
        earum deleniti veritatis corrupti harum saepe error nisi numquam
        voluptatibus, neque accusamus quod placeat sint non. Voluptate, ipsum.
        Temporibus nam at suscipit ipsum eius, alias rerum perspiciatis, debitis
        a aliquam molestias corrupti, placeat error cum. Reiciendis dignissimos
        maxime quaerat commodi corporis nulla molestias vel dolorem, sunt vitae
        adipisci, repellendus nostrum possimus officia rerum dolorum, fuga totam
        ratione esse nam illum alias accusantium?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, omnis
        blanditiis! Animi ea fugiat fuga rem, laudantium accusantium dignissimos
        laborum assumenda sed repellendus asperiores quos? Molestiae sequi
        assumenda animi sed quo hic nemo tempora qui maiores quam doloribus
        earum deleniti veritatis corrupti harum saepe error nisi numquam
        voluptatibus, neque accusamus quod placeat sint non. Voluptate, ipsum.
        Temporibus nam at suscipit ipsum eius, alias rerum perspiciatis, debitis
        a aliquam molestias corrupti, placeat error cum. Reiciendis dignissimos
        maxime quaerat commodi corporis nulla molestias vel dolorem, sunt vitae
        adipisci, repellendus nostrum possimus officia rerum dolorum, fuga totam
        ratione esse nam illum alias accusantium?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, omnis
        blanditiis! Animi ea fugiat fuga rem, laudantium accusantium dignissimos
        laborum assumenda sed repellendus asperiores quos? Molestiae sequi
        assumenda animi sed quo hic nemo tempora qui maiores quam doloribus
        earum deleniti veritatis corrupti harum saepe error nisi numquam
        voluptatibus, neque accusamus quod placeat sint non. Voluptate, ipsum.
        Temporibus nam at suscipit ipsum eius, alias rerum perspiciatis, debitis
        a aliquam molestias corrupti, placeat error cum. Reiciendis dignissimos
        maxime quaerat commodi corporis nulla molestias vel dolorem, sunt vitae
        adipisci, repellendus nostrum possimus officia rerum dolorum, fuga totam
        ratione esse nam illum alias accusantium?
      </p>

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
              <Child />
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
