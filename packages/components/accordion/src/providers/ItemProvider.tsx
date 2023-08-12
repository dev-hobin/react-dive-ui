import { createContext, ReactNode, useContext } from "react";

interface Item {
  value: string;
}

const ItemContext = createContext<Item | undefined>(undefined);

export function ItemProvider({
  value,
  children,
}: {
  children: ReactNode;
  value: string;
}) {
  return (
    <ItemContext.Provider value={{ value }}>{children}</ItemContext.Provider>
  );
}

export function useItem() {
  const value = useContext(ItemContext);

  if (!value) {
    throw new Error("useItem 는 Accordion.Item 컴포넌트 안에서 쓰여야 합니다");
  }

  return value;
}
