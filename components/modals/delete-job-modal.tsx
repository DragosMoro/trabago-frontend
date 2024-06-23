"use client";

import { useCardModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bearerAuth } from "@/lib/auth/auth-utils";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";

const DeleteJobModal = () => {
  const router = useRouter();
  const Auth = useAuth();
  const user = Auth?.getUser();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
  const { isOpen, onClose, type, data } = useCardModal();
  const isModalOpen = isOpen && type === "deleteJob";
  const { card } = data;
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const onClick = async () => {
    setIsLoading(true);
    try {
      if (user) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs/${card?.id}`,
          {
            headers: { Authorization: bearerAuth(user) },
          },
        );
      }
      onClose();
      toast.success("The job has been deleted successfully.");
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        toast.error(`Error: ${error.response.data}. Please try again.`);
      } else if (error.request) {
        toast.error(
          "No response from server. Please check your connection and try again.",
        );
      } else {
        toast.error(`Error: ${error.message}. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const mutation = useMutation({
    mutationFn: onClick,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cards"],
      });
    },
  });

  const onClickHandler = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0 text-zinc-900 dark:bg-zinc-950 dark:text-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Job Application
          </DialogTitle>
          <DialogDescription className="pt-4 text-center text-zinc-600 dark:text-zinc-300">
            {
              "Please confirm the deletion of the job application for the position of "
            }
            <span className="font-semibold text-zinc-900 dark:text-white">
              {card?.position}
            </span>
            {" at "}
            <span className="font-semibold text-zinc-900 dark:text-white">
              {card?.company}
            </span>
            ,{" including all related data."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className=" mb-4 px-6 py-4">
          <div className="flex w-full items-center justify-center gap-4">
            <Button
              disabled={isLoading}
              onClick={onClose}
              className="bg-zinc-200 text-zinc-900 transition-all duration-300 ease-in hover:bg-zinc-300 dark:bg-zinc-900/40 dark:text-white dark:hover:bg-zinc-900"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClickHandler}
              className="bg-[#0b70a9] text-white transition-all duration-300 ease-in hover:bg-[#0b70a9]/80 "
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteJobModal;

