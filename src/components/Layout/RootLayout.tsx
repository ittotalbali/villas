import React from "react";
import { Toaster } from "sonner";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-black font-sans flex justify-center items-center">
      <div
        className="w-full bg-white shadow-lg mx-auto"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toaster richColors position="top-center" closeButton duration={5000} />
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
