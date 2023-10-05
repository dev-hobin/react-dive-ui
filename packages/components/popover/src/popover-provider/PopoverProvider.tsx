import { ReactNode, createContext } from "react";
import { PopoverOptions, usePopover } from "../usePopover";

export const PopoverContext = createContext<
  ReturnType<typeof usePopover> | undefined
>(undefined);

type PopoverProviderProps = {
  children: ReactNode | (({ isOpen }: { isOpen: boolean }) => ReactNode);
} & PopoverOptions;
export const PopoverProvider = ({
  children,
  ...options
}: PopoverProviderProps) => {
  const popover = usePopover(options);

  return (
    <PopoverContext.Provider value={popover}>
      {typeof children === "function"
        ? children({ isOpen: popover.state.isOpen })
        : children}
    </PopoverContext.Provider>
  );
};
