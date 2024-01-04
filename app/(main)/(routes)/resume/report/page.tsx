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
  }
  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-auto"
      style={{
        background: `
      linear-gradient(to right bottom,#09090b  40%, #055b8c 10%, transparent 50%),
      linear-gradient(to left top, #09090b 40%, #033b5b 10%)
  
  `,
      }}
    >
      <div className="flex h-[400px] w-[600px] flex-col items-center justify-between space-y-2 rounded-lg bg-zinc-900 px-10 py-[30px]">
        <div className="">
          <h1 className="mb-3 text-center text-3xl font-bold text-zinc-200">
            Resume Report
          </h1>
          <p className="text-center text-sm font-light text-zinc-400">
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
          <Button onClick={redirectToBoard} className="bg-zinc-800 transition-all duration-300 dark:text-zinc-200 dark:hover:bg-zinc-600/90 dark:hover:text-zinc-300 w-[180px]">
            Go Back To Board
          </Button>
          <Button onClick={redirectToTryAgain} className="bg-zinc-800 transition-all duration-300 dark:text-zinc-200 dark:hover:bg-zinc-600/90 dark:hover:text-zinc-300 w-[180px]">
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
