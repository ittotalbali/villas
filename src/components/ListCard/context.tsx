import type { Villa } from "@/lib/api/hooks/villas";
import { createContext, useContext } from "react";

interface ContextProps {
  villa: Villa;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const ListCardContextProvider = ({
  children,
  villa,
}: {
  children: React.ReactNode;
  villa: Villa;
}) => {
  return <Context.Provider value={{ villa }}>{children}</Context.Provider>;
};

export const useListCardContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useListCardContext must be used within ListCardContextProvider"
    );
  }

  return context;
};
