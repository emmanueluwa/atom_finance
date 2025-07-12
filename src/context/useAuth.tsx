"use client";

import { UserProfile } from "@/models/User";
import { loginApi, registerApi } from "@/services/AuthService";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<UserProfile | null>(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // check if the code is running in the browser (client-side) rather than on the server.
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (user && token) {
        setUser(JSON.parse(user));
        setToken(token);
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      }
    }

    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerApi(email, username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);

          const userObject = {
            username: res?.data.username,
            email: res?.data.email,
          };

          localStorage.setItem("user", JSON.stringify(userObject));

          setToken(res?.data.token);

          setUser(userObject!);

          toast.success("Logged in");

          router.push("/search");
        }
      })
      .catch(() => toast.warning("Something went wrong."));
  };

  const loginUser = async (username: string, password: string) => {
    await loginApi(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);

          const userObject = {
            username: res?.data.username,
            email: res?.data.email,
          };

          localStorage.setItem("user", JSON.stringify(userObject));

          setToken(res?.data.token);

          setUser(userObject!);

          toast.success("Logged in");

          router.push("/search");
        }
      })
      .catch(() => toast.warning("Something went wrong."));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken("");

    router.push("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }

  return context;
};
