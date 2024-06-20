"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SidebarLogo = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/boards");
  };
  return (
    <div className="pb-10 pt-6">
      <div
        className="flex items-center justify-center gap-2 hover:cursor-pointer"
        onClick={onClick}
      >
        <Image height={40} width={40} alt="logo" src="/logo.svg" />
        <span className="flex text-xl font-bold text-black dark:text-white">
          TrabaGo
        </span>
      </div>
    </div>
  );
};

export default SidebarLogo;
