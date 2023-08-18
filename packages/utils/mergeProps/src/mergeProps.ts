interface Props {
  [key: string]: any;
}

export function mergeProps(baseProps: Props, overrideProps: Props) {
  const mergedProps = { ...baseProps };

  for (const propName in baseProps) {
    const overridePropValue = overrideProps[propName];
    const basePropValue = baseProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (overridePropValue && basePropValue) {
        mergedProps[propName] = (...args: unknown[]) => {
          basePropValue(...args);
          overridePropValue(...args);
        };
      } else if (overridePropValue) {
        mergedProps[propName] = overridePropValue;
      }
    } else if (propName === "style") {
      mergedProps[propName] = { ...overridePropValue, ...basePropValue };
    } else if (propName === "className") {
      mergedProps[propName] = [overridePropValue, basePropValue]
        .filter(Boolean)
        .join(" ");
    }
  }

  return { ...overrideProps, ...mergedProps };
}
