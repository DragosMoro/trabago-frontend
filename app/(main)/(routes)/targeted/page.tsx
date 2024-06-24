"use client";

import { Dropzone } from "@/components/ui/dropzone";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
const Statistics = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const handleFileChange = (file: File) => {
    setUploadedFile(file);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(event.target.value);
  };

  async function uploadFile(file: File, jobDescription: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_FLASK_URL}/analyze`,
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
    if (jobDescription.length < 50) {
      toast.info("Job description must be at least 50 characters long.");
      return;
    }

    if (uploadedFile) {
      router.push("/loading");
      const response = await uploadFile(uploadedFile, jobDescription);
      const URL = qs.stringifyUrl({
        url: pathname + "/report",
        query: { data: JSON.stringify(response) },
      });
      router.push(URL);
    } else {
      toast.info("Please upload a file.");
    }
  };

  return (
    <div className="bg-custom-gradient-light dark:bg-custom-gradient-dark flex h-full w-full items-center justify-center overflow-auto">
      <div className="flex flex-col items-center justify-center gap-10 rounded-lg bg-zinc-100 px-6 py-6 shadow-md dark:bg-zinc-900 dark:text-zinc-200">
        <h1 className="pb-4 text-3xl font-semibold">Targeted Job Resume</h1>
        <div className="flex gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-md text-center font-medium capitalize">
              Upload the job description
            </span>
            <Textarea
              placeholder="Please ensure your input contains more than 50 characters."
              className="h-[300px] w-[400px] resize-none bg-zinc-200 dark:bg-zinc-800 "
              onChange={handleTextChange}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <span className="text-md text-center font-medium capitalize">
              Upload your resume
            </span>
            <Dropzone
              onChange={handleFileChange}
              className="h-[300px] w-[400px]"
              fileExtension="pdf"
            />
          </div>
        </div>
        <Button
          onClick={sendResume}
          className="bg-[#0b70a9] text-white transition-all duration-300 ease-out hover:bg-[#0b70a9]/80 hover:ease-in"
        >
          Get The Report
        </Button>
        {/* <Collapsible className="mt-6 flex flex-col items-center justify-center">
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
            <div className="flex w-[250px] flex-col items-center justify-center rounded-lg bg-zinc-800 py-4 pl-10 pr-4 text-sm md:w-[440px] lg:w-[700px]">
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
        </Collapsible> */}
      </div>
    </div>
  );
};
export default Statistics;
