import React, { useState, useRef } from "react";
import Button from "../button/button";
import UploadIcon from "@/assets/icons/uploadIcon";
import CloseIcon from "@/assets/icons/closeIcon";

interface ImageUploadProps {
  label?: string;
  required?: boolean;
  className?: string;
  desc?: string;
  descClass?: string;
  multiple?: boolean;
  maxFiles?: number;
  name: string; // Added name prop
  onChange: (files: File[]) => void; // Added onChange prop
  accept?:string
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  required,
  className,
  desc,
  descClass,
  multiple = false,
  maxFiles = 1,
  name, // Added name prop
  onChange, // Added onChange prop
  accept,
}) => {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
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
    const files = Array.from(e.dataTransfer.files);
    handleImageUpload(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleImageUpload(files);
  };

  const handleImageUpload = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newImages = imageFiles
      .slice(0, maxFiles - images.length)
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

    const updatedImages = [...images, ...newImages].slice(0, maxFiles);
    setImages(updatedImages);

    // Call the onChange prop with the updated files
    onChange(updatedImages.map((img) => img.file));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const getUpdatedLabel = () => {
    if (!label) return "";
    if (!multiple || maxFiles <= 1) return label;
    return `${label} (${images.length}/${maxFiles})`;
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // Call the onChange prop with the updated files
    onChange(updatedImages.map((img) => img.file));
  };

  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 text-sm font-semibold text-footer-bg">
          {getUpdatedLabel()}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {images.length < maxFiles && (
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
              accept="image/*"
              multiple={multiple}
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              name={name}
              
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
                Upload File{multiple ? "s" : ""}
              </Button>
            </div>
          </div>
          <div className={descClass}>{desc}</div>
        </>
      )}

      {images.length > 0 && (
        <div className="mt-4 space-y-2">
          {images.map((image, index) => (
            <div
              key={index}
              className="px-3 bg-[#E5F0FA99] min-h-[76px] flex justify-between items-center border-2 border-customBorder rounded-lg"
            >
              <img
                src={image.preview}
                alt={`Uploaded ${index + 1}`}
                className="w-20 h-14 object-cover"
              />
              <div className="font-bold text-xs">{image.file.name}</div>
              <button onClick={() => handleRemoveImage(index)}>
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
