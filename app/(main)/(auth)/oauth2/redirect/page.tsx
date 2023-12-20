"use client";

import AuthContext from "@/components/providers/auth-provider";
import { parseJwt } from "@/lib/auth/auth-utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface User {
  data: any;
  accessToken: string;
}

const OAuth2 = () => {
  const authContext = useContext(AuthContext);

  let userLogin: (user: User) => void;
  if (authContext) {
    ({ userLogin } = authContext);
  }

  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      handleLogin(token);
      console.log("Acces_oauth:  " + token);
      router.push("/boards");

    } else {
      router.push("/");
    }
  }, []);

  const handleLogin = (accessToken: string): void => {
    console.log("Acces_oauth:  " + accessToken);
    const data = parseJwt(accessToken);
    console.log("Acces_oauth:  " + data);
    const user: User = { data, accessToken };
    console.log("Acces_oauth:  " + user);

    if (userLogin) {
      userLogin(user);
    }
  };

  return null;
};

export default OAuth2;
