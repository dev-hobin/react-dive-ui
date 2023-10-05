import {
  Backdrop,
  Close,
  Trigger,
  Panel,
  Title,
  Description,
  Portal,
} from "./parts";
import { DialogProvider } from "./dialog-provider";

export const Dialog = Object.assign(
  {},
  {
    Provider: DialogProvider,
    Close,
    Backdrop,
    Trigger,
    Panel,
    Title,
    Description,
    Portal,
  }
);
