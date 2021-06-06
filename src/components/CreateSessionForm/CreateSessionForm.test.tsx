import { ApolloProvider } from "@apollo/react-hooks";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import * as React from "react";
import { Router } from "react-router";
import { createApolloClient } from "../../apollo-client";
import { UserContext } from "../../userContext";
import { CreateSessionForm } from "./CreateSessionForm";

describe("<CreateSessionForm />", () => {
  const apolloClient = createApolloClient();
  test("Home link should exist and navigate to home when clicked", () => {
    const history = createMemoryHistory();

    const Example = () => {
      return (
        <UserContext.Provider
          value={{ user: { id: 1475, name: "asdf" }, setUser: () => {} }}
        >
          <ApolloProvider client={apolloClient}>
            <Router history={history}>
              <CreateSessionForm />
            </Router>
          </ApolloProvider>
        </UserContext.Provider>
      );
    };

    // todo
  });
});
