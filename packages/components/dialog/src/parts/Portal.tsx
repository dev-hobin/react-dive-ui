import { ReactNode } from "react";
import { createPortal } from "react-dom";

type PortalProps = { children: ReactNode };
export const Portal = (props: PortalProps) => {
  const container = globalThis?.document?.body;
  return container ? createPortal(props.children, container) : null;
};

Portal.displayName = "Dialog.Description";
