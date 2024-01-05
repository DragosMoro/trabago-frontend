"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

const LoadingPage = () => {
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  let message;
  if (loadingTime < 5) {
    message = "Loading your data...";
  } else if (loadingTime < 10) {
    message = "Still working on it...";
  } else {
    message = "Sorry for the wait. We're doing our best...";
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-black text-white">
      <Image src="logo.svg" width={160} height={160} alt="logo" className="animate-pulse" />
      <h1 className="mt-5 text-xl">{message}</h1>
    </div>
  );
};

export default LoadingPage;