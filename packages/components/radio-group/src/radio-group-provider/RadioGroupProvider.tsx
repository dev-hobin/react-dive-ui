import { ReactNode, createContext } from "react";
import { RadioGroupOptions, useRadioGroup } from "../useRadioGroup";

export const RadioGroupContext = createContext<
  ReturnType<typeof useRadioGroup> | undefined
>(undefined);

type RadioGroupProviderProps = { children: ReactNode } & RadioGroupOptions;
export const RadioGroupProvider = ({
  children,
  ...options
}: RadioGroupProviderProps) => {
  const radioGroup = useRadioGroup(options);

  return (
    <RadioGroupContext.Provider value={radioGroup}>
      {children}
    </RadioGroupContext.Provider>
  );
};
