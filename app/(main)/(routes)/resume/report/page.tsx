"use client";
import { Button } from "@/components/ui/button";
import { redirect, useRouter, useSearchParams } from "next/navigation";

export default function Report() {
  const searchParams = useSearchParams();
  const params = Array.from(searchParams.entries());

  const router = useRouter();
  const redirectToTryAgain = () => {
    router.push("/resume");
  };
  const redirectToBoard = () => {
    router.push("/boards");
  };
  return (
    <div className="bg-custom-gradient-light dark:bg-custom-gradient-dark flex h-full w-full items-center justify-center overflow-auto ">
      <div className="flex h-[400px] w-[600px] flex-col items-center justify-between space-y-2 rounded-lg bg-zinc-100 px-10 py-[30px] dark:bg-zinc-900">
        <div className="">
          <h1 className="mb-3 text-center text-3xl font-bold dark:text-zinc-200">
            Resume Report
          </h1>
          <p className="text-center text-sm dark:text-zinc-400">
            Here&apos;s your resume report, showing the top three fields and
            their percentages, indicating how well your resume matches job
            requirements.
          </p>
        </div>

        <ul>
          {params
            .sort((a, b) => parseFloat(b[1]) - parseFloat(a[1]))
            .map(([key, value]) => {
              const formattedValue = parseFloat(value).toFixed(2);
              return (
                <li key={key}>
                  <strong>{key}:</strong> {formattedValue} %
                </li>
              );
            })}
        </ul>
        <div className="flex items-center gap-[100px]">
          <Button
            onClick={redirectToBoard}
            className="w-[180px] bg-zinc-200 text-zinc-900 transition-all duration-300 ease-in hover:bg-zinc-300 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            Go Back To Board
          </Button>
          <Button
            onClick={redirectToTryAgain}
            className="w-[180px] bg-[#0b70a9] text-white transition-all duration-300 ease-in dark:hover:bg-[#0b70a9]/80 hover:bg-[#0b70a9]/90"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
