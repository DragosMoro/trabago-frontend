import { Card, Column, ColumnFormatForJobAdd } from "@/lib/types";
import { boolean } from "zod";
import { create } from "zustand";

export type ModalType = "addJob" | "editJob" | "deleteJob" | "addColumn" | "editColumn" | "deleteColumn";

interface ModalData{
  column?: Column | ColumnFormatForJobAdd;
  card?: Card;
  
}

type CardModalStore = {
  type: ModalType | null,
  data:ModalData,
  isOpen: boolean;
  onOpen: (type:ModalType, data?:ModalData) => void;
  onClose: () => void;
};

export  const useCardModal = create<CardModalStore>((set) => ({
  type:null,
  data:{},
  isOpen: false,
  onOpen: (type, data ={}) => set({ isOpen: true, type , data}),
  onClose: () => set({ isOpen: false, type: null}),
}));
