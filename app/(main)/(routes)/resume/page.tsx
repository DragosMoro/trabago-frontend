"use client";

import { Dropzone } from "@/components/ui/dropzone";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { usePathname, redirect, useRouter } from "next/navigation";
import qs from "query-string";
import { toast } from "sonner";
const Resume = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  // Function to handle the change in uploaded files
  const handleFileChange = (file: File) => {
    setUploadedFile(file);
  };

  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/resume/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  const sendResume = async () => {
    if (uploadedFile) {
      router.push("/loading");
      const response = await uploadFile(uploadedFile);
      const URL = qs.stringifyUrl({
        url: pathname + "/report",
        query: response,
      });
      router.push(URL);
    } else {
      toast.info("Please upload a file.");
    }
  };

  return (
    <div className="bg-custom-gradient-light dark:bg-custom-gradient-dark flex h-full w-full items-center justify-center overflow-auto">
      <div className="flex flex-col items-center justify-center gap-10 rounded-lg bg-zinc-100 px-6 py-6 shadow-md dark:bg-zinc-900 dark:text-zinc-200">
        <h1 className="text-md font-semibold capitalize md:text-xl lg:text-2xl xl:text-3xl">
          Upload your resume
        </h1>
        <Dropzone
          onChange={handleFileChange}
          className="h-[200px] w-[250px] md:h-[140px] md:w-[440px] lg:h-[180px] lg:w-[700px]"
          fileExtension="pdf"
        />
        <Button
          onClick={sendResume}
          className="bg-[#0b70a9] text-white transition-all duration-300 ease-out hover:bg-[#0b70a9]/80 hover:ease-in "
        >
          Get The Report
        </Button>
        <Collapsible className="mt-6 flex flex-col items-center justify-center">
          <div className="md:text-md mb-4 flex items-center justify-center gap-2 text-sm font-semibold capitalize lg:text-lg">
            <h2>Upload Guidelines for Your Resume</h2>
            <CollapsibleTrigger
              className="rounded-md transition-all duration-300 dark:hover:bg-zinc-700"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronUp className="h-6 w-6" />
              ) : (
                <ChevronDown className="h-6 w-6" />
              )}
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="flex w-[250px] flex-col items-center justify-center rounded-lg bg-zinc-200 py-4 pl-10 pr-4 text-sm dark:bg-zinc-800 md:w-[440px] lg:w-[700px] ">
              <ul className=" list-disc space-y-3">
                <li>Upload your resume in PDF format.</li>
                <li>Ensure your resume is no larger than 2MB.</li>
                <li>Ensure your resume is in English.</li>
                <li>
                  Your resume should be from the tech industry, as these are the
                  domains it can be classified in:&nbsp;
                  <span className="font-semibold">
                    Python Developer, Database Administrator, Project Manager,
                    Web Developer, Network Administrator, Security Analyst,
                    Systems Administrator, Front-End Developer, Java Developer.
                  </span>
                </li>
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default Resume;
