import { ReactNode, createContext } from "react";
import { DialogOptions, useDialog } from "../useDialog";

export const DialogContext = createContext<
  ReturnType<typeof useDialog> | undefined
>(undefined);

type DialogProviderProps = {
  children: ReactNode | (({ isOpen }: { isOpen: boolean }) => ReactNode);
} & DialogOptions;
export const DialogProvider = ({
  children,
  ...options
}: DialogProviderProps) => {
  const dialog = useDialog({ ...options, modal: options.modal ?? true });

  return (
    <DialogContext.Provider value={dialog}>
      {typeof children === "function"
        ? children({ isOpen: dialog.state.open })
        : children}
    </DialogContext.Provider>
  );
};
