import { boolean } from "zod";
import { create } from "zustand";

export type ModalType = "addJob" | "editJob" | "deleteJob" | "addColumn" | "editColumn" | "deleteColumn";

type CardModalStore = {
  type: ModalType | null,
  isOpen: boolean;
  onOpen: (type:ModalType) => void;
  onClose: () => void;
};

export  const useCardModal = create<CardModalStore>((set) => ({
  type:null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null}),
}));

