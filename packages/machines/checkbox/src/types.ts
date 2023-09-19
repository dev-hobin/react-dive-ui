import { ActorRefFrom } from "xstate";
import { machine } from "./machine";

export type CheckedState = "checked" | "unchecked" | "indeterminate";

export type FormOptions = {
  name: string;
  required?: boolean;
};

export type Context = {
  id: string;
  checkedState: CheckedState;
  disabled: boolean;
  value: string;
  form: FormOptions | null;
};

export type Input = Pick<Context, "id"> &
  Partial<Pick<Context, "checkedState" | "disabled" | "value" | "form">>;

export type Events =
  | { type: "CHECK" }
  | { type: "SET.CHECKED"; checked: boolean }
  | { type: "SET.DISABLED"; disabled: boolean }
  | { type: "SET.INDETERMINATE" };

export type Actions =
  | { type: "toggleCheckedState" }
  | {
      type: "setCheckedState";
      params: { checkedState: CheckedState };
    }
  | { type: "setDisabled"; params: { disabled: boolean } };

export type Guards = { type: "isDisabled" } | { type: "isIndeterminate" };

export type Service = ActorRefFrom<typeof machine>;
