import React from "react";
import { StyledHeader } from "./styles";
import { Link } from "react-router-dom";
import { Heading, Flex, Box } from "@chakra-ui/core";
import { UserContext } from "../../userContext";

export const AppHeader = () => {
  const { user, setUser } = React.useContext(UserContext);
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
        {JSON.stringify(user)}
      </Box>
    </StyledHeader>
  );
};
