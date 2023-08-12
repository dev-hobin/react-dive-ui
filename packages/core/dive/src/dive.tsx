import {
  Children,
  ElementType,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";
import { DiveForwardRef, DivePropsWithoutRef, JsxElements } from "./types";
import { mergeProps } from "./utils/mergeProps";
import { composeRefs } from "./utils/composeRefs";

function withAsChild<TElement extends ElementType>(Component: TElement) {
  const DiveComponent = forwardRef(
    (props: DivePropsWithoutRef<TElement>, ref?: DiveForwardRef<TElement>) => {
      const { asChild, children, ...restProps } = props;

      if (!asChild) {
        return <Component {...props} ref={ref} />;
      }

      const onlyChild = Children.only(children);

      return isValidElement(onlyChild)
        ? cloneElement(children, {
            ...mergeProps(restProps, children.props),
            ref: ref
              ? composeRefs(ref, (children as any).ref)
              : (children as any).ref,
          })
        : null;
    }
  );

  // @ts-ignore
  DiveComponent.displayName = Component.displayName || Component.name;

  return DiveComponent;
}

export const jsxFactory = () => {
  const cache = new Map();

  return new Proxy(withAsChild, {
    apply(target, thisArg, argArray) {
      return withAsChild(argArray[0]);
    },
    get(_, element) {
      const asElement = element as ElementType;
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement));
      }
      return cache.get(asElement);
    },
  }) as unknown as JsxElements;
};

export const dive = jsxFactory();
