import React, { useState, useRef, useEffect } from "react";
import Button from "../button/button";
import UploadIcon from "@/assets/icons/uploadIcon";
import CloseIcon from "@/assets/icons/closeIcon";

interface ImageUploadProps {
  label?: string;
  required?: boolean;
  className?: string;
  desc?: string;
  descClass?: string;
  name: string;
  onChange: (files: File[]) => void;
  existingFiles?: any[];
  multiple?: boolean;
  maxFiles?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  required,
  className,
  desc,
  descClass,
  name,
  onChange,
  existingFiles = [],
  multiple = true,
  maxFiles = Infinity,
}) => {
  const [files, setFiles] = useState<{ file: File; preview: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingFiles.length > 0) {
      const existingImages = existingFiles.map((file) => ({
        file: file,
        preview: URL.createObjectURL(file),
      }));
      setFiles(existingImages);
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
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach((file, index) => {
      console.log(`Selected image ${index + 1} type:`, file.type);
    });
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles: File[]) => {
    const imageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    const newImages = imageFiles
      .slice(0, maxFiles - files.length)
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

    const updatedFiles = [...files, ...newImages].slice(0, maxFiles);
    setFiles(updatedFiles);
    onChange(updatedFiles.map((img) => img.file));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange(updatedFiles.map((img) => img.file));
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
          {label}{" "}
          {multiple && maxFiles < Infinity && `(${files.length}/${maxFiles})`}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {files.length < maxFiles && (
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
              id="image-upload"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              name={name}
              multiple={multiple}
            />
            <div className="text-center min-w-[198px] h-[128px]">
              <div className="flex justify-center">
                <UploadIcon />
              </div>
              <p className="mb-4 text-sm text-[#737273] font-medium">
                Click or Drag Image{multiple ? "s" : ""} to this area to upload
              </p>
              <Button
                variant="highlighted"
                className="font-semibold rounded-lg"
                onClick={handleButtonClick}
              >
                Upload Image{multiple ? "s" : ""}
              </Button>
            </div>
          </div>
          <div className={descClass}>{desc}</div>
        </>
      )}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="px-3 bg-[#E5F0FA99] min-h-[76px] flex justify-between items-center border-2 border-customBorder rounded-lg"
            >
              <div className="flex items-center">
                <img
                  src={file.preview}
                  alt={`Uploaded ${index + 1}`}
                  className="w-20 h-14 object-cover mr-2"
                />
              </div>
              <div className="font-bold text-xs">
                {truncateFileName(file.file.name, 15)}
              </div>
              <div>
                <button onClick={() => handleRemoveFile(index)}>
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

export default ImageUpload;
