import { Course } from "@/lib/types";
import Image from "next/image";

const CourseCard: React.FC<Course> = ({
  imageUrl,
  title,
  instructorName,
  courseUrl,
}) => {
  return (
    <a
      href={courseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="transform cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 hover:opacity-90 hover:shadow-lg"
    >
      <div className="flex h-full w-full flex-col items-center justify-between rounded-md border dark:bg-zinc-900 bg-zinc-200 p-1 text-center">
        <Image
          loader={() => imageUrl}
          src={imageUrl}
          alt="Course"
          layout="responsive"
          width={80}
          height={80}
          className="h-full w-full rounded-md object-cover"
        />
        <div className="my-auto flex flex-col items-center">
          <h2 className="mt-2 text-sm font-semibold">{title}</h2>
          <p className="text-xs">{instructorName}</p>
        </div>
      </div>
    </a>
  );
};

export default CourseCard;
