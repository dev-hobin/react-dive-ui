import { createContext } from "react";

export type Item = { value: string; disabled: boolean };
export const ItemContext = createContext<Item | undefined>(undefined);
