import { createContext } from "react";

export type Radio = { value: string; disabled: boolean };
export const RadioContext = createContext<Radio | undefined>(undefined);
