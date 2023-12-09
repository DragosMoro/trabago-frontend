"use client";
import { useCardModal } from "@/hooks/use-modal-store";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
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
import { Column } from "@/lib/types";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, Link } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { JobType, WorkMode } from "@/lib/enums";
import {
  useMutation,
  useQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const formSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string(),
  column: z.string().min(1, "Column is required"),
  date: z.date({
    required_error: "A date is required.",
  }),
  salary: z.string(),
  url: z.string(),
  jobType: z.nativeEnum(JobType).optional(),
  workMode: z.nativeEnum(WorkMode).optional(),
});

const AddJobModal = () => {
  const { isOpen, onClose, type, data } = useCardModal();
  const [columns, setColumns] = useState<Column[]>([]);
  const isModalOpen = isOpen && type === "addJob";
  const { column } = data;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      description: "",
      column: column ? column.name : "",
      date: new Date(),
      salary: "",
      url: "",
      jobType: JobType.Empty,
      workMode: WorkMode.Empty,
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (column) {
      form.setValue("column", column.name);
    } else {
      form.setValue("column", "");
    }
  }),
    [form, column];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const columnsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/jobColumn/getAll`,
        );
        setColumns(columnsResponse.data);
        console.log(columns);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  // console.log(columns);
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formattedDate = values.date
        ? format(values.date, "dd MMM yyyy")
        : null;
      console.log(JSON.stringify({ ...values, date: formattedDate }));
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        ...values,
        date: formattedDate,
      });
      form.reset();
      onClose();
    } catch (error) {
      console.log(error);
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
      <DialogContent className=" min-h-[700px] overflow-hidden text-zinc-300 dark:bg-zinc-950 md:max-w-7xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-zinc-200">
            Add A New Job {column ? "in " + column.name : ""}
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
                      <FormLabel className="text-md ml-1">
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
                      <FormLabel className="text-md ml-1">
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
                      <FormLabel className="text-md ml-1">Location *</FormLabel>
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
                      <FormLabel className="text-md ml-1">
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

                {/* this is the select column select box  */}
                <FormField
                  control={form.control}
                  name="column"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md ml-1">
                        Select Column *
                      </FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-[230px]">
                          <SelectTrigger className="capitalize">
                            <SelectValue placeholder="Select a column" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(columns).map((column) => (
                            <SelectItem
                              key={column.id}
                              value={column.name}
                              className="capitalize"
                            >
                              {column.name.toLowerCase()}
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
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <div className="ml-1">
                          <span className="text-[16px]">URL</span>
                          <Button
                            variant="ghost"
                            onClick={onLinkClick}
                            className="ml-1 h-6 w-6 px-0 py-0"
                            disabled={isLoading}
                          >
                            <Link className="h-3 w-3" />
                          </Button>
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
                      <FormLabel className="text-md ml-1">Job Type</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-[230px]">
                          <SelectTrigger className="capitalize">
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
                      <FormLabel className="text-md ml-1">Work Mode</FormLabel>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-[230px]">
                          <SelectTrigger className="capitalize">
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
                      <FormLabel className="text-md ml-1">Salary</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="w-[230px]"
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
                      <FormLabel className="text-md ml-1">
                        Job Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter The Job Description"
                          className="h-[150px] w-[770px] resize-none"
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
                className="duration-350 ml-auto mr-auto h-[50px] w-[150px] border bg-zinc-950 text-zinc-100 
              transition ease-out hover:bg-zinc-900 hover:ease-in
                "
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
