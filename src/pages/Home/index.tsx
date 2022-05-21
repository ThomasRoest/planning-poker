import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { CreateSessionForm } from "../../components/CreateSessionForm";
import { boxStyles } from "../Session";

export const Home = () => {
  return (
    <Box {...boxStyles}>
      <Heading mb={4}>Create new session</Heading>
      <CreateSessionForm />
    </Box>
  );
};
