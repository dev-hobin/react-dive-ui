import { Meta } from "@storybook/react";
import { Popover } from "@react-dive-ui/popover";
import * as css from "./style.css";

const meta = {
  title: "Component/Popover",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover.Provider>;

export default meta;

export const Default = () => {
  return (
    <Popover.Provider
      floatingOptions={{
        offset: 12,
        shiftPadding: 12,
        placement: "bottom-start",
        arrowLength: 4,
      }}
    >
      {({ isOpen }) => (
        <>
          <Popover.Trigger className={css.trigger}>
            Toggle Popover
          </Popover.Trigger>
          {isOpen && (
            <Popover.Portal>
              <Popover.Panel className={css.panel}>
                <Popover.Title className={css.title}>
                  About Popover
                </Popover.Title>
                <Popover.Description className={css.description}>
                  Popovers are perfect for floating panels with arbitrary
                  content like navigation menus, mobile menus and flyout menus.
                </Popover.Description>

                <Popover.Close className={css.close}>Close</Popover.Close>
                <Popover.Arrow className={css.arrow} />
              </Popover.Panel>
            </Popover.Portal>
          )}
        </>
      )}
    </Popover.Provider>
  );
};

export const Nested = () => {
  return (
    <Popover.Provider
      floatingOptions={{
        offset: 12,
        shiftPadding: 12,
        placement: "bottom-start",
        arrowLength: 4,
      }}
    >
      {({ isOpen }) => (
        <>
          <Popover.Trigger className={css.trigger}>
            Toggle Popover
          </Popover.Trigger>
          {isOpen && (
            <Popover.Portal>
              <Popover.Panel className={css.panel}>
                <Popover.Title className={css.title}>
                  About Popover
                </Popover.Title>
                <Popover.Description className={css.description}>
                  Popovers are perfect for floating panels with arbitrary
                  content like navigation menus, mobile menus and flyout menus.
                </Popover.Description>

                <footer
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <Popover.Close className={css.close}>Close</Popover.Close>
                  <Popover.Provider
                    floatingOptions={{
                      offset: 12,
                      shiftPadding: 12,
                      placement: "right-start",
                      arrowLength: 4,
                    }}
                  >
                    {({ isOpen }) => (
                      <>
                        <Popover.Trigger className={css.close}>
                          Toggle Popover
                        </Popover.Trigger>
                        {isOpen && (
                          <Popover.Portal>
                            <Popover.Panel className={css.panel}>
                              <Popover.Title className={css.title}>
                                About Popover
                              </Popover.Title>
                              <Popover.Description className={css.description}>
                                Popovers are perfect for floating panels with
                                arbitrary content like navigation menus, mobile
                                menus and flyout menus.
                              </Popover.Description>

                              <Popover.Close className={css.close}>
                                Close
                              </Popover.Close>
                              <Popover.Arrow className={css.arrow} />
                            </Popover.Panel>
                          </Popover.Portal>
                        )}
                      </>
                    )}
                  </Popover.Provider>
                </footer>
                <Popover.Arrow className={css.arrow} />
              </Popover.Panel>
            </Popover.Portal>
          )}
        </>
      )}
    </Popover.Provider>
  );
};
