"use client";
import HeroNavbar from "@/components/hero/hero-navbar";
import HeroSection from "@/components/hero/hero-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MainPage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/signin");
  };

  const handleRegisterClick = () => {
    router.push("/signup");
  };

  return (
    <div className="flex h-screen w-full flex-col">
     <HeroNavbar/>
      <HeroSection />
    </div>
  );
};

export default MainPage;
