"use client";

import { useEffect, useState } from "react";
import AddJobModal from "../modals/add-job-modal";

export const ModalProvider = ()=> {

    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=> {
        setIsMounted(true);
    }, []);

    if(!isMounted)
    {
        return null;
    }
    return (
        <>
      <AddJobModal/>
        </>
    )

}