import { ReactNode } from "react";
import { buttonMachine } from "@react-dive-ui/machines";
import { useActor } from "@xstate/react";

export interface ButtonProps {
  children: ReactNode;
}

export function Button(props: ButtonProps) {
  const [state, send] = useActor(buttonMachine);

  console.log(JSON.stringify(state.context, null, 2));

  return <button>{props.children}</button>;
}

Button.displayName = "Button";
