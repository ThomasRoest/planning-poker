import React from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { SessionPage } from "./pages/Session";
import { CSSReset, LightMode } from "@chakra-ui/core";
import { ThemeProvider, ColorModeProvider } from "@chakra-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { createApolloClient } from "./apollo-client";
import { UserContext } from "./userContext";
import About from "./pages/About";

const apolloClient = createApolloClient();

const App = () => {
  const [user, setUser] = React.useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider>
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
        </ThemeProvider>
      </ApolloProvider>
    </UserContext.Provider>
  );
};

export default App;
