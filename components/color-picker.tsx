import { useEffect, useState } from "react";
interface ColorPickerProps {
  onColorSelect: (color: string) => void;
  remainingColor: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onColorSelect,
  remainingColor,
}) => {
  const [color, setColor] = useState("");
  useEffect(() => {
    setColor(remainingColor);
  }, []);

  const handleColorSelect = (color: string) => {
    setColor(color);
    onColorSelect(color);
  };
  return (
    <div className="itmes-center flex h-[300px] w-[300px] flex-col justify-center gap-3">
      <h1 className="mb-5 text-center text-xl font-semibold">Choose a color</h1>
      <div className="flex items-center justify-center gap-5 ">
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#f43f5e] transition-all duration-300 ease-in-out hover:bg-[#f43f5e]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#f43f5e" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#f43f5e")}
        ></div>
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#ec4899] transition-all duration-300 ease-in-out hover:bg-[#ec4899]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#ec4899" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#ec4899")}
        ></div>
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#d946ef] transition-all duration-300 ease-in-out hover:bg-[#d946ef]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#d946ef" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#d946ef")}
        ></div>

        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#9333ea] transition-all duration-300 ease-in-out hover:bg-[#9333ea]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#9333ea" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#9333ea")}
        ></div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#5326a1] transition-all duration-300 ease-in-out hover:bg-[#5326a1]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#5326a1" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#5326a1")}
        ></div>
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#4f46e5] transition-all duration-300 ease-in-out hover:bg-[#4f46e5]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#4f46e5" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#4f46e5")}
        ></div>
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#2563eb] transition-all duration-300 ease-in-out hover:bg-[#2563eb]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#2563eb" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#2563eb")}
        ></div>
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#0284c7] transition-all duration-300 ease-in-out hover:bg-[#0284c7]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#0284c7" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#0284c7")}
        ></div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#0891b2] transition-all duration-300 ease-in-out hover:bg-[#0891b2]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#0891b2" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#0891b2")}
        ></div>
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#0d9488] transition-all duration-300 ease-in-out hover:bg-[#0d9488]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#0d9488" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#0d9488")}
        ></div>
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#10b981] transition-all duration-300 ease-in-out hover:bg-[#10b981]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#10b981" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#10b981")}
        ></div>
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#65a30d] transition-all duration-300 ease-in-out hover:bg-[#65a30d]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#65a30d" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#65a30d")}
        ></div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#facc15] transition-all duration-300 ease-in-out hover:bg-[#facc15]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#facc15" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#facc15")}
        ></div>
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#d97706] transition-all duration-300 ease-in-out hover:bg-[#d97706]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#d97706" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#d97706")}
        ></div>
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#ea580c] transition-all duration-300 ease-in-out hover:bg-[#ea580c]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#ea580c" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#ea580c")}
        ></div>
        <div
          className={`h-[40px] w-[40px] cursor-pointer rounded-full bg-[#dc2626] transition-all duration-300 ease-in-out hover:bg-[#dc2626]/90 hover:shadow-lg hover:transition-all hover:duration-1000 ${
            color === "#dc2626" ? " border-2 border-white" : ""
          }`}
          onClick={() => handleColorSelect("#dc2626")}
        ></div>
      </div>
    </div>
  );
};

export default ColorPicker;
