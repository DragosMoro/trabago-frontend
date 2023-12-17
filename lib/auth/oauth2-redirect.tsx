"use client";
import AuthContext from "@/components/providers/auth-provider";
import React, { use, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { parseJwt } from "./auth-utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface User {
  data: any;
  accessToken: string;
}


const OAuth2Redirect = () => { {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // handle the case when authContext is null
    throw new Error("authContext is null");
  }

  const { userLogin } = authContext;
  const [redirectTo, setRedirectTo] = useState<string>("/signin");

  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      console.log("Acces_oauth:  " + token);
      const redirect = "/boards";
      setRedirectTo(redirect);
    } else {
      // If no access token, redirect to signin
      setRedirectTo("/signin");
    }
  }, []);

  const handleLogin = (accessToken: string): void => {
    console.log("Acces_oauth:  " + accessToken);
    const data = parseJwt(accessToken);
    console.log("Acces_oauth:  " + data);
    const user: User = { data, accessToken };
    console.log("Acces_oauth:  " + user);

    userLogin(user);
  };
  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  }, [redirectTo]);
}
  return null;
};

export default OAuth2Redirect;