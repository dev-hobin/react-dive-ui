import { ElementToPropertyFactory } from "./types";

function createFactory(
  fn: (props: Record<string, any>) => Record<string, any>
): ElementToPropertyFactory {
  return new Proxy({} as any, {
    get() {
      return fn;
    },
  });
}

export const properties: ElementToPropertyFactory = createFactory((v) => v);
