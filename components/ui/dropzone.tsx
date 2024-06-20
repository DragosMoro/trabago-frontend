import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";

interface DropzoneProps {
  onChange: (file: File) => void;
  className?: string;
  fileExtension?: string;
}

export function Dropzone({
  onChange,
  className,
  fileExtension,
  ...props
}: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileInfo, setFileInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files.length === 0) {
      toast.info(
        "No new file was selected. To replace the current file, please select a new one.",
      );
      return;
    }
    const uploadedFile = files[0];

    // Check file size
    const fileSizeInMB = uploadedFile.size / (1024 * 1024);
    if (fileSizeInMB > 2) {
      toast.error("File size exceeds 2MB. Please select a smaller file.");
      return;
    }

    if (fileExtension && !uploadedFile.name.endsWith(`.${fileExtension}`)) {
      setError(`Invalid File Type. Expected: .${fileExtension}`);
      toast.error(`Invalid File Type. Expected: .${fileExtension}`);
      return;
    }

    const fileSizeInKB = Math.round(uploadedFile.size / 1024);

    onChange(uploadedFile);

    setFileInfo(`Uploaded File: ${uploadedFile.name} (${fileSizeInKB} KB)`);
    setError(null);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card
      className={`border-2 border-dashed dark:bg-zinc-800 bg-zinc-200 transition-all duration-300 hover:cursor-pointer hover:border-muted-foreground/50 dark:text-zinc-400 dark:hover:text-zinc-200 text-zinc-600 hover:text-zinc-800 ${className}`}
      {...props}
      role="button"
      onClick={handleButtonClick}
    >
      <CardContent
        className="flex h-full flex-col items-center justify-center space-y-2 px-2"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <UploadCloud className="h-10 w-10 md:h-14 md:w-14 xl:h-20 xl:w-20" />
        <div className="flex items-center justify-center pt-5 capitalize">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="md:text-md text-center text-sm font-medium">
              Drag a File here or Click to upload your resume
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={`.${fileExtension}`}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
        {fileInfo && <p className="">{fileInfo}</p>}
        {error && <span className="text-red-500">{error}</span>}
      </CardContent>
    </Card>
  );
}
