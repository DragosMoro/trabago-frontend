"use client";
import { useRouter, useSearchParams } from "next/navigation";
import BentoGrid from "@/components/bento/bento-grid";

export default function TargetedReport() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dataString = searchParams.get("data");

  if (!dataString) {
    console.error("No data received");
    return <div>No data received</div>;
  }

  let params;
  try {
    params = JSON.parse(dataString);
  } catch (error) {
    console.error("Error parsing data:", error);
    return <div>Error parsing data</div>;
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
