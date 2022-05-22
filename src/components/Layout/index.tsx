import React from "react";
import { AppHeader } from "../AppHeader";
import { AppFooter } from "../AppFooter";
import { Container, Grid } from "@chakra-ui/react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid templateRows="auto 1fr auto" height="calc(100vh)">
      <AppHeader />
      <Container maxW="container.lg">{children}</Container>
      <AppFooter />
    </Grid>
  );
};
