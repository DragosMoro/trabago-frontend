import { Course } from "@/lib/types";
import CourseCard from "./course-card";
import TextCard from "./text-card";


interface BentoGridProps {
  missingHardSkills: string[];
  missingSoftSkills: string[];
  udemyCourses: Course[];
}

const BentoGrid: React.FC<BentoGridProps> = ({
  missingHardSkills,
  missingSoftSkills,
  udemyCourses,
}) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 rounded-xl bg-zinc-900/80 p-4 xl:h-[85vh] xl:w-[60vw]">
      <TextCard heading="Missing Hard Skills" items={missingHardSkills} />
      <TextCard heading="Missing Soft Skills" items={missingSoftSkills} />

      {udemyCourses.map((course: Course) => (
        <CourseCard
          key={course.courseUrl}
          imageUrl={course.imageUrl}
          title={course.title}
          instructorName={course.instructorName}
          courseUrl={course.courseUrl}
        />
      ))}
    </div>
  );
};

export default BentoGrid;
