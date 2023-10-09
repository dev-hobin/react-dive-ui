import { JSX, CSSProperties, HTMLAttributes } from "react";

type DataAttr = { [key: `data-${string}`]: string | number | undefined };
type CSSVariables = { [key: `--${string}`]: string | number | undefined };
type ElementsWithoutRef = {
  [K in keyof React.JSX.IntrinsicElements]: Omit<
    JSX.IntrinsicElements[K],
    "ref"
  >;
};
type ElementToProperties = ElementsWithoutRef & {
  element: Omit<HTMLAttributes<HTMLElement>, "ref">;
};
export type ElementToPropertyFactory = {
  [K in keyof ElementToProperties]: (
    props: K extends keyof JSX.IntrinsicElements
      ? DataAttr &
          JSX.IntrinsicElements[K] & { style?: CSSProperties & CSSVariables }
      : never
  ) => ElementToProperties[K];
} & {
  element(
    props: DataAttr &
      HTMLAttributes<HTMLElement> & { style?: CSSProperties & CSSVariables }
  ): ElementToProperties["element"];
};
