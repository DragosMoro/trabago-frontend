import { ScrollArea } from "../ui/scroll-area";

interface TextCardProps {
  items: string[];
  heading: string;
}

const TextCard: React.FC<TextCardProps> = ({ items, heading }) => {
  return (
    <ScrollArea className="col-span-2 rounded-md border bg-zinc-200 p-4 text-center dark:bg-zinc-900 dark:text-white">
      <h2 className="sticky top-0 mb-4 bg-zinc-200 text-2xl font-bold dark:bg-zinc-900">
        {heading}
      </h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-lg">
            {item}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default TextCard;
