import React from "react";
import { DivePropsWithoutRef, JsxElements } from "./types";
import { mergeProps } from "./utils/mergeProps";
import { composeRefs } from "./utils/composeRefs";

function withAsChild<TElement extends React.ElementType>(
  Component: TElement,
  displayName: string
) {
  const DiveComponent = React.forwardRef(
    (
      props: DivePropsWithoutRef<TElement>,
      ref: React.ForwardedRef<React.ElementRef<TElement>>
    ) => {
      const { asChild, children, ...restProps } = props;

      if (!asChild) {
        return <Component {...props} ref={ref} />;
      }

      const onlyChild = React.Children.only(children);

      return React.isValidElement(onlyChild)
        ? React.cloneElement(children, {
            ...mergeProps(restProps, children.props),
            ref: ref
              ? composeRefs(ref, (children as any).ref)
              : (children as any).ref,
          })
        : null;
    }
  );

  DiveComponent.displayName = displayName;

  return DiveComponent;
}

const jsxFactory = () => {
  const cache = new Map();

  return new Proxy(withAsChild, {
    apply(target, thisArg, argArray) {
      return withAsChild(argArray[0], argArray[1]);
    },
    get(target, prop: keyof JSX.IntrinsicElements) {
      const asElement = prop;
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement, `dive.${asElement}`));
      }
      return cache.get(asElement);
    },
  }) as unknown as JsxElements;
};

export const dive = jsxFactory();
