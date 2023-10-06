import { Meta } from "@storybook/react";
import { Dialog } from "@react-dive-ui/dialog";
import * as css from "./style.css";

const meta = {
  title: "Component/Dialog",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

export const Default = () => {
  return (
    <div>
      <Dialog.Provider>
        {({ isOpen }) => (
          <>
            <Dialog.Trigger className={css.trigger}>Open Dialog</Dialog.Trigger>
            {isOpen && (
              <Dialog.Portal>
                <Dialog.Backdrop className={css.backdrop} />
                <Dialog.Panel className={css.panel}>
                  <Dialog.Title className={css.title}>
                    Dialog Title
                  </Dialog.Title>
                  <Dialog.Description className={css.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                    architecto nesciunt amet debitis sint repellendus quisquam
                    rem nulla nemo assumenda ullam, sit, id eum delectus animi
                    dolore cupiditate necessitatibus. Voluptates?
                  </Dialog.Description>

                  <footer className={css.footer}>
                    <Dialog.Close className={css.close}>Close</Dialog.Close>
                  </footer>
                </Dialog.Panel>
              </Dialog.Portal>
            )}
          </>
        )}
      </Dialog.Provider>
    </div>
  );
};
