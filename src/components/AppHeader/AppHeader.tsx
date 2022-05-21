import React from "react";
import { StyledHeader } from "./styles";
import { Link } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";

export const AppHeader = () => {
  return (
    <StyledHeader>
      <Box w="75%" margin="auto">
        <nav>
          <Flex align="center">
            <Link to="/">
              <Heading color="teal.500">Planning poker</Heading>
            </Link>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </Flex>
        </nav>
      </Box>
    </StyledHeader>
  );
};
