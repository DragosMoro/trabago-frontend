"use client";
import { useCardModal } from "@/hooks/use-modal-store";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format, parse } from "date-fns";
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
  description: z
    .string()
    .max(2000, "Description should not exceed 2000 characters")
    .optional(),
  salary: z.string(),
  jobUrl: z.string().optional(),
  jobType: z.string().optional(),
  workMode: z.string().optional(),
});

const EditJobModal = () => {
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const router = useRouter();
  const Auth = useAuth();
  const user = Auth?.getUser();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
  const { isOpen, onClose, type, data } = useCardModal();
  const isModalOpen = isOpen && type === "editJob";
  const { card } = data;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: card?.company,
      position: card?.position,
      location: card?.location,
      description: card?.description,
      column: card?.jobColumn.id,
      date: card?.date ? parse(card.date, "dd MMM yyyy", new Date()) : null,
      salary: card?.salary,
      jobUrl: card?.jobUrl,
      jobType: card?.jobType,
      workMode: card?.workMode,
    },
  });

  const modalOpenRef = useRef(false);

  useEffect(() => {
    console.log(card);
    if (isModalOpen && !modalOpenRef.current && card) {
      form.setValue("company", card?.company);
      form.setValue("position", card?.position);
      form.setValue("location", card?.location);
      form.setValue("description", card?.description);
      form.setValue("column", card?.jobColumn.id);
      form.setValue(
        "date",
        card?.date ? parse(card.date, "dd MMM yyyy", new Date()) : null,
      );
      form.setValue("salary", card?.salary);
      form.setValue("jobUrl", card?.jobUrl);
      form.setValue("jobType", card?.jobType);
      form.setValue("workMode", card?.workMode);
      modalOpenRef.current = true;
    } else if (!isModalOpen) {
      modalOpenRef.current = false;
    }
  }, [card, form, isModalOpen]);

  const queryClient = useQueryClient();

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
      const {
        company,
        position,
        location,
        description,
        salary,
        jobUrl,
        jobType,
        workMode,
      } = values;
      if (card) {
        const { id, createdAt, updatedAt, order, jobColumn, imageUrl } = card;
        const updatedCard = {
          id,
          company,
          position,
          location,
          date: formattedDate,
          createdAt,
          updatedAt,
          order,
          description,
          imageUrl,
          salary,
          jobType,
          jobUrl: jobUrl,
          workMode,
          jobColumn: selectedColumn != null ? selectedColumn : jobColumn,
        };
        if (user) {
          await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/jobs`,
            updatedCard,
            {
              headers: { Authorization: bearerAuth(user) },
            },
          );
        }
      }
      form.reset();
      onClose();
      toast.success("The job has been updated successfully.");
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
    }
  };

  const onDelete = async () => {
    try {
      if (card) {
        const { id } = card;
        if (user) {
          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, {
            headers: { Authorization: bearerAuth(user) },
          });
        }
      }
      form.reset();
      onClose();
      toast.success("The job has been deleted successfully.");
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 500) {
          toast.error(
            "Error: One or more fields exceed the maximum length of 255 characters. Please shorten your input and try again.",
          );
        } else {
          toast.error(`Error: ${error.response.data}. Please try again.`);
        }
      } else if (error.request) {
        toast.error(
          "No response from server. Please check your connection and try again.",
        );
      } else {
        toast.error(`Error: ${error.message}. Please try again.`);
      }
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onLinkClick = () => {
    const jobUrl = form.getValues().jobUrl;
    if (jobUrl) {
      window.open(jobUrl, "_blank");
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
            Edit the Job Details
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
                            selected={field.value || undefined}
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
                        defaultValue={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          const selectedColumn = columns?.find(
                            (column) => column.id === value,
                          );
                          if (selectedColumn) {
                            console.log(selectedColumn);
                            setSelectedColumn(selectedColumn);
                          }
                        }}
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
                                value={columnFormat.id}
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

                {/* this is the URL field */}
                <FormField
                  control={form.control}
                  name="jobUrl"
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
                        onValueChange={field.onChange}
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
                        onValueChange={field.onChange}
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
                Save Job
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditJobModal;
