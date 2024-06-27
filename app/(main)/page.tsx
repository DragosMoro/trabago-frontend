"use client";
import HeroNavbar from "@/components/hero/hero-navbar";
import HeroSection from "@/components/hero/hero-section";

const MainPage = () => {

  return (
    <div className="flex h-screen w-full flex-col">
      <HeroNavbar />
      <HeroSection />
    </div>
  );
};

export default MainPage;
