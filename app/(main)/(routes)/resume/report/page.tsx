"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function Report() {
  const searchParams = useSearchParams();
  const params = Array.from(searchParams.entries());

  const paramsMap: { [key: string]: string[] } = {};
  params.forEach(([key, value]) => {
    if (!paramsMap[key]) {
      paramsMap[key] = [];
    }
    paramsMap[key].push(value);
  });

  // Sort values by the first element in each list in descending order
  const sortedParamsMap = Object.fromEntries(
    Object.entries(paramsMap).sort(([, valuesA], [, valuesB]) => {
      if (valuesA[0] < valuesB[0]) return 1;
      if (valuesA[0] > valuesB[0]) return -1;
      return 0;
    }),
  );

  // Remove the first element from each sorted list
  Object.keys(sortedParamsMap).forEach((key) => {
    sortedParamsMap[key].shift();
  });

  const router = useRouter();
  const redirectToTryAgain = () => {
    router.push("/resume");
  };
  const redirectToBoard = () => {
    router.push("/boards");
  };

  return (
    <div className="flex h-full w-full items-center justify-center overflow-auto bg-custom-gradient-light dark:bg-custom-gradient-dark">
      <div className="flex h-[600px] w-[600px] flex-col items-center justify-between space-y-2 rounded-lg bg-zinc-100 px-10 py-[30px] dark:bg-zinc-900">
        <div className="">
          <h1 className="mb-3 text-center text-3xl font-bold dark:text-zinc-200">
            Resume Report
          </h1>
          <p className="text-center text-sm dark:text-zinc-400">
            Here&apos;s your resume report, showing the top 3 domains that match
            your resume and the most important hard skills for each domain.
          </p>
        </div>
        <ul className="text-center">
          {Object.entries(sortedParamsMap).map(([key, values], index) => (
            <li key={key} className="pb-4">
              <strong>
                {index + 1}. {key}
              </strong>{" "}
              <br /> {values.join(", ")}
            </li>
          ))}
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
            className="w-[180px] bg-[#0b70a9] text-white transition-all duration-300 ease-in hover:bg-[#0b70a9]/90 dark:hover:bg-[#0b70a9]/80"
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
