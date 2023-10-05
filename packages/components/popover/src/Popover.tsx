import {
  Close,
  Trigger,
  Panel,
  Title,
  Description,
  Arrow,
  Portal,
} from "./parts";
import { PopoverProvider } from "./popover-provider";

export const Popover = Object.assign(
  {},
  {
    Provider: PopoverProvider,
    Close,
    Arrow,
    Trigger,
    Panel,
    Title,
    Description,
    Portal,
  }
);
