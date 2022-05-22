import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const AppFooter = () => {
  return <Box padding={5} bg={useColorModeValue('gray.100', 'gray.900')}>Planning poker</Box>;
};
