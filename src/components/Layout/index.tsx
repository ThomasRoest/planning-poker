import React from "react";
import { AppHeader } from "../AppHeader";
import { StyledLayout } from "./styles";
import { AppFooter } from "../AppFooter";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledLayout>
      <AppHeader />
      <main style={{ flex: "1" }}>{children}</main>
      <AppFooter />
    </StyledLayout>
  );
};
