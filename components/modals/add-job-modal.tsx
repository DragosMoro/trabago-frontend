"use client";
import { useCardModal } from "@/hooks/use-modal-store";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Dialog } from "@radix-ui/react-dialog";

import {
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Building2,
  CalendarCheck,
  CalendarIcon,
  Clipboard,
  Home,
  KanbanSquare,
  Link,
  LucideUserSquare,
  MapPin,
  Wallet2,
} from "lucide-react";
import { Calendar } from "../ui/calendar";
import { JobType, WorkMode } from "@/lib/enums";
import {
  useMutation,
  useQueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { Column } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/auth-provider";
import { bearerAuth } from "@/lib/auth/auth-utils";

const formSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  column: z.string().min(1, "Column is required"),
  date: z.date({
    required_error: "A date is required.",
  }),
  salary: z.string(),
  url: z.string(),
  description: z
    .string()
    .max(2000, "Description should not exceed 2000 characters")
    .optional(),
  jobType: z.string().optional(),
  workMode: z.string().optional(),
});

const AddJobModal = () => {
  const router = useRouter();
  const Auth = useAuth();
  const user = Auth?.getUser();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
  const { isOpen, onClose, type, data } = useCardModal();
  const isModalOpen = isOpen && type === "addJob";
  const { columnFormat } = data;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      description: "",
      column: columnFormat ? columnFormat.name : "",
      date: new Date(),
      salary: "",
      url: "",
      jobType: "",
      workMode: "",
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (columnFormat) {
      form.setValue("column", columnFormat.name);
    } else if (form.getValues("column") === "") {
      form.setValue("column", "");
    }
  }, [columnFormat, form]);

  const fetchColumns = async (query = ""): Promise<Column[]> => {
    if (user) {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/jobColumn/getAllByUser/${user.data.id}`,
        {
          headers: { Authorization: bearerAuth(user) },
        },
      );
      const data = response.data;
      return data;
    }
    return [];
  };

  const {
    data: columns,
    isLoading: isLoadingColumns,
    error: columnsError,
  } = useQuery({
    queryKey: ["columns"],
    queryFn: () => fetchColumns(),
  });

  // console.log(columns);
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formattedDate = values.date
        ? format(values.date, "dd MMM yyyy")
        : null;
      console.log(JSON.stringify({ ...values, date: formattedDate }));
      if (user) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs`,
          {
            ...values,
            date: formattedDate,
          },
          {
            headers: { Authorization: bearerAuth(user) },
          },
        );
      }
      form.reset();
      onClose();
      toast.success("The job has been added successfully.");
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 500) {
          toast.error(
            "Error: One or more fields exceed the maximum length of 255 characters. Please shorten your input and try again.",
          );
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      } else if (error.request) {
        toast.error(
          "No response from server. Please check your connection and try again.",
        );
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onLinkClick = () => {
    const url = form.getValues().url;
    if (url) {
      window.open(url, "_blank");
    }
  };

  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cards"],
      });
    },
  });

  const formSubmitHandler = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className=" min-h-[700px] overflow-hidden dark:bg-zinc-950 dark:text-zinc-300 md:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold dark:text-zinc-200">
            Add A New Job {columnFormat ? "in " + columnFormat.name : ""}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmitHandler)}>
            <div className="flex flex-col gap-7">
              {/* this is the first row */}
              <div className="flex justify-center gap-10">
                {/* this is the company name field */}
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md ml-1 flex items-center">
                        <Building2 className="mr-2 h-4 w-4" />
                        Company Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="w-[230px]"
                          placeholder="Enter The Company Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* this is the job position field */}
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md ml-1 flex items-center">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Job Position *
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="w-[230px]"
                          placeholder="Enter The Job Position"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* this is the location field */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md ml-1 flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        Location *
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="w-[230px]"
                          placeholder="Enter The Location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* this is the second row */}
              <div className="flex justify-center gap-10">
                {/* this is the date datepicker */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <FormLabel className="text-md ml-1 flex items-center">
                        <CalendarCheck className="mr-2 h-4 w-4" />
                        Applied On *
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[230px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                              disabled={isLoading}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick A Date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            className="max-h-[230px] max-w-[400px] overflow-hidden"
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* this is the select columnFormat select box  */}
                <FormField
                  control={form.control}
                  name="column"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md ml-1 flex items-center">
                        <KanbanSquare className="mr-2 h-4 w-4" />
                        Select Column *
                      </FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={(value) =>
                          field.onChange({ target: { value } })
                        }
                        defaultValue={field.value}
                      >
                        <FormControl className="w-[230px]">
                          <SelectTrigger className="capitalize focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Select A Column" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {columns &&
                            columns.map((columnFormat) => (
                              <SelectItem
                                key={columnFormat.id}
                                value={columnFormat.name}
                                className="capitalize"
                              >
                                {columnFormat.name.toLowerCase()}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* this is the url field */}
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="text-md ml-1 flex items-center">
                          <Button
                            variant="ghost"
                            onClick={onLinkClick}
                            className="mr-1 h-6 w-6 px-0 py-0"
                            disabled={isLoading}
                          >
                            <Link className="h-3 w-3" />
                          </Button>
                          <span className="text-[16px]">URL</span>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="w-[230px]"
                          placeholder="Enter The URL"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* this is the third row */}
              <div className="flex justify-center gap-10">
                {/* this is the job type select box  */}
                <FormField
                  control={form.control}
                  name="jobType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md ml-1 flex items-center">
                        <LucideUserSquare className="mr-2 h-4 w-4" />
                        Job Type
                      </FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={(value) => field.onChange(value || "")}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-[230px]">
                          <SelectTrigger className="capitalize focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Select a job type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(JobType).map((jobType) => (
                            <SelectItem
                              key={jobType}
                              value={jobType}
                              className="capitalize"
                            >
                              {jobType.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* this is the work mode select box  */}

                <FormField
                  control={form.control}
                  name="workMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md ml-1 flex items-center">
                        <Home className="mr-2 h-4 w-4" />
                        Work Mode
                      </FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={(value) => field.onChange(value || "")}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-[230px]">
                          <SelectTrigger className="capitalize focus:ring-0 focus:ring-offset-0">
                            <SelectValue placeholder="Select a work mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(WorkMode).map((workMode) => (
                            <SelectItem
                              key={workMode}
                              value={workMode}
                              className="capitalize"
                            >
                              {workMode.toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* this is the salary field */}
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md ml-1 flex items-center">
                        <Wallet2 className="mr-2 h-4 w-4" />
                        Salary
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="w-[230px] focus:ring-0 focus:ring-offset-0"
                          placeholder="Enter The Salary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col items-center ">
                {/* this is the description textarea*/}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md ml-1 flex items-center">
                        <Clipboard className="mr-2 h-4 w-4" />
                        Job Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter The Job Description"
                          className="h-[150px] w-[770px] resize-none"
                          maxLength={2000}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="pt-[28px]">
              <Button
                disabled={isLoading}
                className="duration-350 ml-auto mr-auto h-[50px] w-[150px] border bg-[#0b70a9] text-white transition ease-out hover:bg-[#0b70a9]/80 hover:ease-in"
              >
                Add Job
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobModal;
