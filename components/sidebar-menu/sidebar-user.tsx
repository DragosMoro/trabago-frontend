"use client";
import { UserCircle2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ElementRef, useEffect, useRef } from "react";
import { useAuth } from "../providers/auth-provider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { useCardModal } from "@/hooks/use-modal-store";

const SidebarUser = () => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const Auth = useAuth();
  const { onOpen } = useCardModal();
  const user = Auth?.getUser();
  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="m-auto flex h-[50px] w-[200px] cursor-pointer items-center justify-center gap-2 rounded-lg border">
          <UserCircle2 className="h-6 w-6 " />
          <span>
            {/* {console.log(user.data)} */}
            {user?.data.name.length > 20
              ? user?.data.name.split(" ")[0]
              : user?.data.name}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3 max-w-[240px]" side="top" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-400">
          User Actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-400"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={() => onOpen("logout")}
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          variant="ghost"
        >
          Logout
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default SidebarUser;
