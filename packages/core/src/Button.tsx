import { buttonMachine } from "@react-dive-ui/machines";

export interface ButtonProps {
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  console.log(buttonMachine);
  return <button>{props.children}</button>;
}

Button.displayName = "Button";
