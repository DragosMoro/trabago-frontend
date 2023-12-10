"use client";

import { useEffect, useState } from "react";
import AddJobModal from "../modals/add-job-modal";
import AddColumnModal from "../modals/add-column-modal";
import EditColumnModal from "../modals/edit-column-modal";
import DeleteColumnModal from "../modals/delete-column-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <AddJobModal />
      <AddColumnModal />
      <EditColumnModal/>
      <DeleteColumnModal/>
    </>
  );
};
