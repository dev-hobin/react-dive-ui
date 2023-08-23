import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@react-dive-ui/use-isomorphic-layout-effect";

export function usePreviousValue<TValue>(value: TValue) {
  const ref = useRef<TValue>();

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
