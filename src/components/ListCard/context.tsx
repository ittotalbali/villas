import type { Villa } from "@/lib/api/hooks/villas";
import { createContext, useContext } from "react";

interface ContextProps {
  villa: Villa;
  handleCloseCard: () => void;
  forMap?: boolean;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const ListCardContextProvider = ({
  children,
  villa,
  handleCloseCard,
  forMap = false,
}: {
  children: React.ReactNode;
  villa: Villa;
  handleCloseCard: () => void;
  forMap?: boolean;
}) => {
  return (
    <Context.Provider value={{ villa, handleCloseCard, forMap }}>
      {children}
    </Context.Provider>
  );
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
