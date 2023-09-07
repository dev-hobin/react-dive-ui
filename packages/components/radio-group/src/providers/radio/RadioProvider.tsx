import { ReactNode } from "react";

import { Radio, RadioContext } from "./context";

type RadioProviderProps = {
  value: Radio["value"];
  disabled?: Radio["disabled"];
  children: ReactNode;
};
export function RadioProvider({
  value,
  disabled = false,
  children,
}: RadioProviderProps) {
  return (
    <RadioContext.Provider value={{ value, disabled }}>
      {children}
    </RadioContext.Provider>
  );
}
