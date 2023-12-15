import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="h-full w-full">{children}</main>;
};

export default MainLayout;
