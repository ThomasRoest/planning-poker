import React from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { SessionPage } from "./pages/Session";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createApolloClient } from "./apollo-client";
import { UserContext } from "./userContext";
import About from "./pages/About";
import { ApolloProvider } from "@apollo/client";
import {
  ChakraProvider,
  ColorModeProvider,
  CSSReset,
  LightMode,
} from "@chakra-ui/react";

const apolloClient = createApolloClient();

const App = () => {
  const [user, setUser] = React.useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider>
          <ColorModeProvider>
            <LightMode>
              <Router>
                <Layout>
                  <CSSReset />
                  <div>
                    <Switch>
                      <Route path="/session/:uid">
                        <SessionPage />
                      </Route>
                      <Route path="/about">
                        <About />
                      </Route>
                      <Route path="/">
                        <Home />
                      </Route>
                    </Switch>
                  </div>
                </Layout>
              </Router>
            </LightMode>
          </ColorModeProvider>
        </ChakraProvider>
      </ApolloProvider>
    </UserContext.Provider>
  );
};

export default App;
