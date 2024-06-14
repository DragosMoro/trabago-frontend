import { ScrollArea } from "../ui/scroll-area";

interface TextCardProps {
  items: string[];
  heading: string;
}

const TextCard: React.FC<TextCardProps> = ({ items, heading }) => {
  return (
    <ScrollArea className="col-span-2 rounded-md border bg-[#1a1a1a] p-4 text-center text-white ">
        <h2 className="mb-4 text-2xl font-bold">{heading}</h2>
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
