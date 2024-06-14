"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

interface User {
  data: any;
  accessToken: string;
}

interface AuthContextProps {
  user: User | null;
  getUser: () => User | null;
  userIsAuthenticated: () => boolean;
  userLogin: (user: User) => void;
  userLogout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  if (!isMounted) {
    return null;
  }
  const getUser = (): User | null => {
    return JSON.parse(localStorage.getItem("user") || "null");
  };

  const userIsAuthenticated = (): boolean => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      return false;
    }
    const parsedUser = JSON.parse(storedUser);

    // if user has token expired, logout user
    if (
      parsedUser &&
      parsedUser.data &&
      Date.now() > parsedUser.data.exp * 100000
    ) {
      userLogout();
      return false;
    }
    return true;
  };

  const userLogin = (user: User): void => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const userLogout = (): void => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const contextValue: AuthContextProps = {
    user,
    getUser,
    userIsAuthenticated,
    userLogin,
    userLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
export default AuthContext;

export function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider };
