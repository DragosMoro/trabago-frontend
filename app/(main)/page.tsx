"use client";
import HeroNavbar from "@/components/hero/hero-navbar";
import { WavyBackground } from "@/components/ui/wavy-background";

const MainPage = () => {
  return (
    <div className="flex h-screen w-full flex-col">
      <HeroNavbar />
      <WavyBackground
        className="flex h-full flex-col items-center justify-center"
        colors={[
          "#0b3d70",
          "#2a8cce",
          "#3a94d1",
          "#2799bb",
          "#5dbbe1",
          "#6bbde3",
        ]}
        speed="slow"
      >
        <p className="inter-var text-center text-2xl font-bold text-white drop-shadow-lg md:text-4xl lg:text-7xl">
          Boost Your Career Prospects
        </p>
        <p className="inter-var mt-4 text-center text-base font-normal text-white drop-shadow-md md:text-lg">
          Create a standout resume and track your job applications with ease.
        </p>
      </WavyBackground>
    </div>
  );
};

export default MainPage;
