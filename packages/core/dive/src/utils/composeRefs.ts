import { Ref } from "react";

type PossibleRef<TElement> = Ref<TElement> | undefined;

function setRef<TElement>(ref: PossibleRef<TElement>, value: TElement) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as React.MutableRefObject<TElement>).current = value;
  }
}

export function composeRefs<TElement>(...refs: PossibleRef<TElement>[]) {
  return (node: TElement) => refs.forEach((ref) => setRef(ref, node));
}
