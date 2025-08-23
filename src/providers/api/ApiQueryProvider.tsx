import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

const ApiQueryProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default ApiQueryProvider;
