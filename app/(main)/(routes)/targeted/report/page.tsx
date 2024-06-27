"use client";
import { useRouter, useSearchParams } from "next/navigation";
import BentoGrid from "@/components/bento/bento-grid";
import Image from "next/image";
import { AlertCircle } from "lucide-react";

export default function TargetedReport() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dataString = searchParams.get("data");

  if (!dataString) {
    console.error("No data received");
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <AlertCircle
            className="mx-auto text-gray-900 dark:text-gray-100"
            size={48}
          />
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            No Data Received
          </h1>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            It seems like we didn't get any data. Please try again.
          </p>
          <button
            className="mt-6 rounded-lg bg-gray-700 px-4 py-2 font-semibold text-white shadow-md hover:bg-gray-900"
            onClick={() => router.push("/")}
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  let params;
  try {
    params = JSON.parse(dataString);
  } catch (error) {
    console.error("Error parsing data:", error);
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <AlertCircle
            className="mx-auto text-gray-900 dark:text-gray-100"
            size={48}
          />
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Error Parsing Data
          </h1>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            We encountered an error while processing your request. Please try
            again.
          </p>
          <button
            className="mt-6 rounded-lg bg-gray-700 px-4 py-2 font-semibold text-white shadow-md hover:bg-gray-900"
            onClick={() => router.push("/")}
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  const missingHardSkills = params["missing_hard_skills"] || [];
  const missingSoftSkills = params["missing_soft_skills"] || [];
  const udemyCourses = params["udemy_courses"] || [];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-auto bg-custom-gradient-light dark:bg-custom-gradient-dark">
      <BentoGrid
        missingHardSkills={missingHardSkills}
        missingSoftSkills={missingSoftSkills}
        udemyCourses={udemyCourses}
      />
    </div>
  );
}
