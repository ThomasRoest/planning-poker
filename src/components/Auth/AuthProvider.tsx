import React, {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Redirect, Route } from "react-router";

interface AuthContextValue {
  signIn: (value: string) => Promise<{ success: boolean }>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("Expected AuthContext");
  }

  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const mockLogin = useCallback((password: string) => {
    return new Promise<{ success: boolean }>((resolve, reject) => {
      setTimeout(() => {
        if (password === process.env.REACT_APP_PASSWORD) {
          setIsAuthenticated(true);
          resolve({
            success: true,
          });
        } else {
          reject({
            success: false,
			message: "Incorrect password"
          });
        }
      }, 500);
    });
  }, []);

  const value = useMemo(() => {
    return {
      signIn: mockLogin,
      isAuthenticated,
    };
  }, [isAuthenticated, mockLogin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const PrivateRoute = ({
  children,
  path,
}: {
  children: ReactNode;
  path: string;
}) => {
  let auth = useAuthContext();
  return (
    <Route
      path={path}
      render={({ location }) =>
        auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
