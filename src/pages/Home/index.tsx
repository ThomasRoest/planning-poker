import React from "react";
import { Box } from "@chakra-ui/core";
import { Heading } from "@chakra-ui/core";
import { CreateSessionForm } from "../../components/CreateSessionForm";

export const Home = () => {
  return (
    <Box
      w="50%"
      margin="auto"
      bg="white"
      p={4}
      boxShadow="0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
      borderRadius="3px"
      mt={4}
    >
      <Heading mb={4}>Create new session</Heading>
      <CreateSessionForm />
    </Box>
  );
};
