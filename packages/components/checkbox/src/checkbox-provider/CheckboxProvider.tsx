import { ReactNode, createContext } from "react";
import { CheckboxOptions, useCheckbox } from "../useCheckbox";

export const CheckboxContext = createContext<
  ReturnType<typeof useCheckbox> | undefined
>(undefined);

type CheckboxProviderProps = { children: ReactNode } & CheckboxOptions;
export const CheckboxProvider = ({
  children,
  ...options
}: CheckboxProviderProps) => {
  const checkbox = useCheckbox(options);

  return (
    <CheckboxContext.Provider value={checkbox}>
      {children}
    </CheckboxContext.Provider>
  );
};
