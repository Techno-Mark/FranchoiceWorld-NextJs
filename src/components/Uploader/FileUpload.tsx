import React, { useState, useRef } from "react";
import "./FileUpload.css";
import Button from "../button/button";
import UploadIcon from "@/assets/icons/uploadIcon";
import CloseIcon from "@/assets/icons/closeIcon";

interface FileUploadProps {
  label?: string;
  required?: boolean;
  className?: string;
  desc?: string;
  descClass?: string;
  name: string; // Added name prop
  onChange: (file: File | null) => void; // Added onChange prop
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  required,
  className,
  desc,
  descClass,
  name, // Added name prop
  onChange, // Added onChange prop
}) => {
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFileName(files[0].name);
      onChange(files[0]); // Call onChange with the new file
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      onChange(files[0]); // Call onChange with the new file
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFileName("");
    onChange(null); // Call onChange with null to indicate file removal
  };

  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 text-sm font-semibold text-footer-bg">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {!fileName ? (
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
              accept=".pdf, .png, .jpeg, .jpg"
              name={name} // Added name attribute
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
        <div className="mt-4 space-y-2 px-3 bg-[#E5F0FA99] min-h-[76px] flex justify-between items-center border-2 border-customBorder rounded-lg">
          <div>{fileName}</div>
          <div className="font-bold text-xs">{fileName}</div>
          <div>
            <button onClick={handleRemoveFile}>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
