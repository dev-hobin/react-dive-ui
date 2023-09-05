import { Root, List, Trigger, Panel } from "./parts";
import { TabsStoreProvider } from "./tabs-provider";

export const Tabs = Object.assign(
  {},
  { Provider: TabsStoreProvider, Root, List, Trigger, Panel }
);
