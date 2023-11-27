import { ModalProvider } from "@/components/providers/modal-provider";
import React from "react";
import { Toaster } from "sonner";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <ModalProvider />
      {children}
    </>
  );
};

export default MainLayout;
