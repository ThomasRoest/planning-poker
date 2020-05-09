import React from "react";
import { Box } from "@chakra-ui/core";
import { Heading } from "@chakra-ui/core";
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
