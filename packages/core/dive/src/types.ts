import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
} from "react";

export type PropsOf<
  TElement extends
    | keyof JSX.IntrinsicElements
    | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<TElement, ComponentPropsWithoutRef<TElement>>;

export type DivePropsWithoutRef<TElement extends ElementType> =
  PropsOf<TElement> & {
    asChild?: boolean;
  };

export type DivePropsWithRef<TElement extends ElementType> =
  DivePropsWithoutRef<TElement> & { ref?: DiveForwardRef<TElement> };

export type DiveForwardRef<TElement extends ElementType> =
  ComponentPropsWithRef<TElement>["ref"];

export type JsxElements = {
  [TElement in keyof JSX.IntrinsicElements]: DiveForwardRefComponent<TElement>;
};

export type DiveForwardRefComponent<TElement extends ElementType> =
  React.ForwardRefExoticComponent<DivePropsWithRef<TElement>>;
