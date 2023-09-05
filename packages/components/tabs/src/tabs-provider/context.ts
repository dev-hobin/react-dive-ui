import { createContext } from "react";
import { TabsStore } from "../useTabs";

export const TabsStoreContext = createContext<TabsStore | undefined>(undefined);
