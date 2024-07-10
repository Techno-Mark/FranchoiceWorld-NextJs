import React, { useState, useRef, useEffect } from "react";
import "./FileUpload.css";
import Button from "../button/button";
import UploadIcon from "@/assets/icons/uploadIcon";
import CloseIcon from "@/assets/icons/closeIcon";
import PdfIcon from "@/assets/icons/pdfIcon";

interface FileUploadProps {
  label?: string;
  required?: boolean;
  className?: string;
  desc?: string;
  descClass?: string;
  name: string;
  onChange: (file: File | null) => void;
  existingFiles?: any[]; // This should be an array of file objects
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  required,
  className,
  desc,
  descClass,
  name,
  onChange,
  existingFiles = [],
}) => {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingFiles.length > 0 && existingFiles[0]) {
      // Assuming the file name is stored in a 'name' property
      const fileName = existingFiles[0].name || "Existing File";
      setFiles([{ name: fileName, url: "#" }]);
    }
  }, [existingFiles]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFile(droppedFiles[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFile(selectedFiles[0]);
    }
  };

  const handleFile = (file: File) => {
    const newFile = { name: file.name, url: URL.createObjectURL(file) };
    setFiles([newFile]);
    onChange(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFiles([]);
    onChange(null);
  };

  const truncateFileName = (name: string, maxLength: number) => {
    if (name.length <= maxLength) return name;
    const extension = name.split(".").pop();
    const nameWithoutExtension = name.substring(0, name.lastIndexOf("."));
    return `${nameWithoutExtension.substring(
      0,
      maxLength - 3 - (extension?.length || 0)
    )}...${extension}`;
  };

  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 text-sm font-semibold text-footer-bg">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {files.length === 0 ? (
        <>
          <div
            className={`relative bg-[#E5F0FA99] min-h-[188px] flex flex-col justify-center items-center border-2 border-customBorder border-dashed rounded-lg ${
              isDragging ? "border-blue-500" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              name={name}
            />
            <div className="text-center min-w-[198px] h-[128px]">
              <div className="flex justify-center">
                <UploadIcon />
              </div>
              <p className="mb-4 text-sm text-[#737273] font-medium">
                Click or Drag File to this area to upload
              </p>
              <Button
                variant="highlighted"
                className="font-semibold rounded-lg"
                onClick={handleButtonClick}
              >
                Upload Files
              </Button>
            </div>
          </div>
          <div className={descClass}>{desc}</div>
        </>
      ) : (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="px-3 bg-[#E5F0FA99] min-h-[76px] flex justify-between items-center border-2 border-customBorder rounded-lg"
            >
              <div className="flex items-center">
                <PdfIcon className="mr-2" />
              </div>
              <div className="font-bold text-xs">
                {truncateFileName(file.name, 15)}
              </div>
              <div>
                <button onClick={handleRemoveFile}>
                  <CloseIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
