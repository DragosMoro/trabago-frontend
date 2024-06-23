"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useCardModal } from "@/hooks/use-modal-store";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ColorPicker from "../color-picker";
import { KanbanSquare, Palette } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "../providers/auth-provider";
import { bearerAuth } from "@/lib/auth/auth-utils";
import { useRouter } from "next/navigation";

const EditColumnModal = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const router = useRouter();
  const Auth = useAuth();
  const user = Auth?.getUser();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  const formSchema = z.object({
    name: z.string().min(1, "Column name is required"),
    color: z.string().min(1, "Column color is required"),
  });
  const { isOpen, onClose, type, data } = useCardModal();

  const { column } = data;
  const isModalOpen = isOpen && type === "editColumn";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: column?.name,
      color: column?.color,
    },
  });
  const modalOpenRef = useRef(false);

  useEffect(() => {
    if (isModalOpen && !modalOpenRef.current && column) {
      form.setValue("name", column?.name);
      form.setValue("color", column?.color);
      setSelectedColor(column?.color);
      modalOpenRef.current = true;
    } else if (!isModalOpen) {
      modalOpenRef.current = false;
    }
  }, [column, form, isModalOpen]);

  const queryClient = useQueryClient();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { color, name } = values;
      let updatedColumn;
      if (column) {
        const { order, id } = column;

        updatedColumn = {
          color,
          name,
          order,
          id,
        };
      }

      console.log(JSON.stringify(updatedColumn));
      if (user) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/jobColumn`,
          updatedColumn,
          {
            headers: { Authorization: bearerAuth(user) },
          },
        );
      }
      form.reset();
      onClose();
      toast.success("The column has been updated successfully.");
    } catch (error: any) {
      if (error.response) {
        toast.error(`${error.response.data}`);
      } else if (error.request) {
        toast.error(
          "No response from server. Please check your connection and try again.",
        );
      } else {
        toast.error(`${error.message}`);
      }
    }
  };

  const handleClose = () => {
    form.reset();
    setSelectedColor("");
    onClose();
  };

  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns"],
      });
    },
  });

  const formSubmitHandler = (data: any) => {
    mutation.mutate(data);
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className=" min-h-[400px] overflow-hidden dark:text-zinc-300 text-zinc-700 dark:bg-zinc-950 md:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold dark:text-zinc-200 text-zinc-800">
            Edit Column {column?.name}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmitHandler)}>
            <div className="flex flex-col items-center justify-center gap-7">
              {/* this is the company name field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md ml-1 flex items-center">
                      <KanbanSquare className="mr-2 h-4 w-4" />
                      Column Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="w-[230px]"
                        placeholder="Enter The Column Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel className="text-md ml-1 flex items-center">
                      <Palette className="mr-2 h-4 w-4" />
                      Column Color *
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "flex w-[230px] items-center justify-between pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                            placeholder="Select a color"
                            disabled={isLoading}
                          >
                            {selectedColor ? (
                              <>
                                <span className="mr-2">Selected Color</span>
                                <div
                                  className="h-4 w-4 rounded-full"
                                  style={{ backgroundColor: selectedColor }}
                                />
                              </>
                            ) : (
                              <>
                                <span className="mr-2">Select A Color</span>
                              </>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <ColorPicker
                          onColorSelect={(color) => {
                            setSelectedColor(color);
                            form.setValue("color", color);
                          }}
                          remainingColor={selectedColor}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-[35px]">
              <Button
                disabled={isLoading}
                className="duration-350 ml-auto mr-auto h-[50px] w-[150px] border bg-[#0b70a9] text-white transition ease-out hover:bg-[#0b70a9]/80 hover:ease-in
                "
              >
                Edit Column
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EditColumnModal;
