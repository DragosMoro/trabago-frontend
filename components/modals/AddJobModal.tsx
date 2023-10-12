"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/useModalStore";
import { useRouter } from "next/navigation";

const validColors = [
  "Red",
  "Orange",
  "Amber",
  "Yellow",
  "Lime",
  "Green",
  "Emerald",
  "Teal",
  "Cyan",
  "Light Blue",
  "Blue",
  "Indigo",
  "Violet",
  "Purple",
  "Fuchsia",
  "Pink",
  "Rose",
];

const formSchema = z.object({
  companyName: z.string().min(1, {
    message: "Company name is required.",
  }),

  jobTitle: z.string().min(1, {
    message: "Job title is required.",
  }),

  location: z.string().min(1, {
    message: "Location is required.",
  }),

  date: z.string().refine(
    (date) => {
      const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
      return datePattern.test(date);
    },
    {
      message: "Date must be in the format dd/mm/yyyy.",
    },
  ),

  color: z.string().refine((color) => validColors.includes(color), {
    message: "Invalid color. Choose from the list of valid colors.",
  }),
});

const AddJobModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "createJob";
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        companyName: '',
        jobTitle: '',
        location: '',
        date: new Date(), // Data curentă
        color: { label: 'Teal', value: 'Teal' }, // Valoare select implicită
      },
  });

  const isLoading = form.formState.isSubmitting;
  return <div>AddJobModal</div>;
};

export default AddJobModal;
