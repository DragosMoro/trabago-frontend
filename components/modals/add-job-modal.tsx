import { useCardModal } from "@/hooks/use-modal-store";
import React from "react";
import * as z from "zod";

const formSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  column: z.string().min(1, "Column is required"),
  date: z.string().min(1, "Date is required"),
});

const AddJobModal = () => {
  const { isOpen, onClose, type } = useCardModal();
  const isModalOpen = isOpen && type === "addJob";
  

  return <div></div>;
};

export default AddJobModal;
