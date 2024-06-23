import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../ui/mode-toggle";

const HeroNavbar = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/signin");
  };

  const handleRegisterClick = () => {
    router.push("/signup");
  };
  return (
    <div className="flex h-[100px] w-full items-center justify-between px-[50px] xl:px-[100px]">
      <div className="flex items-center gap-2">
        <Image
          height={70}
          width={70}
          alt="logo"
          src="/logo.svg"
          className="z-10"
        />
        <span className="flex text-3xl font-bold text-black dark:text-white">
          TrabaGo
        </span>
      </div>
      <div className="flex gap-4">
        <ModeToggle />
        <Button
          className="text-md border bg-black font-semibold text-white transition-all duration-300 hover:bg-zinc-900/50 hover:text-zinc-200"
          onClick={handleLoginClick}
        >
          Login
        </Button>
        <Button
          className="text-md border bg-[#055b8c] font-semibold text-white transition-all duration-300 hover:bg-[#0b70a9] hover:text-zinc-200"
          onClick={handleRegisterClick}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default HeroNavbar;
