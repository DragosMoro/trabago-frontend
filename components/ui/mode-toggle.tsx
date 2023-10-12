"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "./switch";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [isChecked, setIsChecked] = React.useState(false);

  useEffect(() => {
    if (isChecked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [isChecked, setTheme]);

  const toggleTheme = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div>
      <div className="flex items-center gap-x-2">
        <Sun className="h-4 w-4" />
        <Switch defaultChecked={isChecked} onCheckedChange={toggleTheme} />
        <Moon className="h-4 w-4" />
      </div>
    </div>
  );
}
