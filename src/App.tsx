import React from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { SessionPage } from "./pages/Session";
import { CSSReset } from "@chakra-ui/core";
import { ThemeProvider, ColorModeProvider } from "@chakra-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { createApolloClient } from "./apollo-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apolloClient = createApolloClient();

const App = () => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider>
      <ColorModeProvider>
        <Router>
          <Layout>
            <CSSReset />
            <div>
              <Switch>
                <Route path="/session/:uid">
                  <SessionPage />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
            <ToastContainer />
          </Layout>
        </Router>
      </ColorModeProvider>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
