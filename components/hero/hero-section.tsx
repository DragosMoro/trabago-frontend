import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeroSection = () => {
  const router = useRouter();

  const handleRegisterClick = () => {
    router.push("/signup");
  };

  return (
    <div className="flex h-full w-full items-center justify-between px-[50px] xl:px-[100px]">
      <div className="flex max-w-[450px] flex-col">
        <div></div>
        <span className="mb-3 h-[53px] bg-gradient-to-tr from-white to-zinc-600 bg-clip-text text-5xl font-bold text-transparent">
          Simplify Your Job
        </span>
        <span className="mb-10 h-[53px] bg-gradient-to-tr from-white to-zinc-600 bg-clip-text text-5xl font-bold text-transparent">
          Search Journey
        </span>
        <span className="text-md mb-10 whitespace-normal font-semibold text-zinc-400">
          {" "}
          Managing your job applications has never been easier. Start your
          organized job search today!
        </span>
        <div className="flex gap-5">
          <Button
            className="text-md duration-400 bg-gradient-to-r from-zinc-900 to-zinc-700 font-semibold text-white transition-all ease-in-out hover:bg-zinc-900/50 hover:text-zinc-300"
            onClick={handleRegisterClick}
          >
            Get Started
          </Button>
          <Button
            className="text-md duration-400 bg-gradient-to-r from-zinc-300 to-zinc-500 font-semibold text-black transition-all ease-in-out hover:text-zinc-800 "
            onClick={handleRegisterClick}
          >
            Learn More
          </Button>
        </div>
      </div>
      <div className="relative">
        <Image
          src="/board.svg"
          width={750}
          height={750}
          alt="board"
          className="relative z-10 rounded-lg shadow-xl shadow-zinc-900 2xl:max-h-[950px] max-h-[750px]
            2xl:w-[950px] w-[750px]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
