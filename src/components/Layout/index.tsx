import React from "react";
import { AppHeader } from "../AppHeader";
import { StyledLayout } from "./styles";
import { AppFooter } from "../AppFooter";
import { Box } from "@chakra-ui/react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledLayout>
      <AppHeader />
      <Box as="main" flex="1" bg="gray.50">
        {children}
      </Box>
      <AppFooter />
    </StyledLayout>
  );
};
