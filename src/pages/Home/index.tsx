import React from "react";
import { Box } from "@chakra-ui/core";
import { Button, Heading } from "@chakra-ui/core";
import { useHistory } from "react-router";
import { NewSessionForm } from "../../components/NewSessionForm";

export const Home = () => {
  return (
    <div>
      <Box
        w="75%"
        margin="auto"
        p={4}
        border="1px solid lightgrey"
        borderRadius="3px"
        mt={4}
      >
        <Heading mb={4}>Create new session</Heading>
        <NewSessionForm />
      </Box>
    </div>
  );
};
