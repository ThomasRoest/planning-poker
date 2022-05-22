import React from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const AppHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Flex
      as="header"
      p="5"
      justifyContent="space-between"
      borderBottom="1px"
      borderColor={borderColor}
      align="center"
      mb={5}
    >
      <Link to="/">
        <Heading color="teal.500">Planning poker</Heading>
      </Link>
      <IconButton
        aria-label="Search database"
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      />
    </Flex>
  );
};
