import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/auth-provider";
import { useCardModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const LogoutModal = () => {
  const router = useRouter();
  const Auth = useAuth();
  const user = Auth?.getUser();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
  const { isOpen, onClose, type } = useCardModal();
  const isModalOpen = isOpen && type === "logout";

  const onLogout = () => {
    Auth?.userLogout();
    onClose();
    router.push("/");
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-zinc-950 p-0 text-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Logout
          </DialogTitle>
          <DialogDescription className="pt-4 text-center text-zinc-300">
            Are you sure you want to logout?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className=" mb-4 px-6 py-4">
          <div className="flex w-full items-center justify-center gap-4">
            <Button
              onClick={onClose}
              className="bg-zinc-100 text-zinc-900 transition-all duration-300 ease-in hover:bg-zinc-200 dark:bg-zinc-900/40 dark:text-white dark:hover:bg-zinc-900"
            >
              Cancel
            </Button>
            <Button
              onClick={onLogout}
              className="bg-zinc-900/40 text-zinc-100 transition-all duration-300 ease-in hover:bg-zinc-900 dark:bg-zinc-200 dark:text-black dark:hover:bg-zinc-300"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
