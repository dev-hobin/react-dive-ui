import { HTMLAttributes } from "react";

type DataAttr = Record<`data-${string}`, any>;
type ElementsWithoutRef = {
  [K in keyof JSX.IntrinsicElements]: Omit<JSX.IntrinsicElements[K], "ref">;
};
type ElementToProperties = ElementsWithoutRef & {
  element: Omit<HTMLAttributes<HTMLElement>, "ref">;
};
export type ElementToPropertyFactory = {
  [K in keyof ElementToProperties]: (
    props: K extends keyof JSX.IntrinsicElements
      ? DataAttr & JSX.IntrinsicElements[K]
      : never
  ) => ElementToProperties[K];
} & {
  element(
    props: DataAttr & HTMLAttributes<HTMLElement>
  ): ElementToProperties["element"];
};
