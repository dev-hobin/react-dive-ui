import React from "react";

export interface DiveForwardRefComponent<TElement extends React.ElementType>
  extends React.ForwardRefExoticComponent<DivePropsWithRef<TElement>> {}

export type JsxElements = {
  [TElement in keyof JSX.IntrinsicElements]: DiveForwardRefComponent<TElement>;
};

export type DivePropsWithRef<TElement extends React.ElementType> =
  JSX.LibraryManagedAttributes<
    TElement,
    React.ComponentPropsWithRef<TElement> & {
      asChild?: boolean;
      [key: `data-${string}`]: string | boolean | undefined;
      style?: React.CSSProperties & {
        [styleVariable: `--${string}`]: string | undefined;
      };
    }
  >;

export type DivePropsWithoutRef<TElement extends React.ElementType> =
  JSX.LibraryManagedAttributes<
    TElement,
    React.ComponentPropsWithoutRef<TElement> & {
      asChild?: boolean;
      [key: `data-${string}`]: string | boolean | undefined;
      style?: React.CSSProperties & {
        [styleVariable: `--${string}`]: string | undefined;
      };
    }
  >;
