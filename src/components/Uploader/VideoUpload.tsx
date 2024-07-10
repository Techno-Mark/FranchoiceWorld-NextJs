import React, { useState, useRef, useEffect } from "react";
import Button from "../button/button";
import UploadIcon from "@/assets/icons/uploadIcon";
import CloseIcon from "@/assets/icons/closeIcon";
import VideoIcon from "@/assets/icons/videoIcon";

interface VideoUploadProps {
  label?: string;
  required?: boolean;
  className?: string;
  desc?: string;
  descClass?: string;
  name: string;
  onChange: (files: File[]) => void;
  existingVideos?: any[];
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
}

const VideoUpload: React.FC<VideoUploadProps> = ({
  label,
  required,
  className,
  desc,
  descClass,
  name,
  onChange,
  existingVideos = [],
  multiple = false,
  maxFiles = 1,
  accept = "video/*",
}) => {
  const [videos, setVideos] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingVideos.length > 0) {
      setVideos(existingVideos);
    }
  }, [existingVideos]);

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
    handleVideoUpload(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleVideoUpload(selectedFiles);
  };

  const handleVideoUpload = (files: File[]) => {
    const videoFiles = files.filter((file) => file.type.startsWith("video/"));
    const newVideos = videoFiles.slice(0, maxFiles - videos.length);

    const updatedVideos = [...videos, ...newVideos].slice(0, maxFiles);
    setVideos(updatedVideos);
    onChange(updatedVideos);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveVideo = (index: number) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
    onChange(updatedVideos);
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
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {videos.length < maxFiles ? (
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
              accept="video/*"
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
                Click or Drag Video{multiple ? "s" : ""} to this area to upload
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
      ) : (
        <div className="mt-4 space-y-2">
          {videos.map((video, index) => (
            <div
              key={index}
              className="px-3 bg-[#E5F0FA99] min-h-[76px] flex justify-between items-center border-2 border-customBorder rounded-lg"
            >
              <div className="flex items-center">
                <VideoIcon className="mr-2" />
              </div>
              <div className="font-bold text-xs">
                {truncateFileName(video.name, 15)}
              </div>
              <div>
                <button onClick={() => handleRemoveVideo(index)}>
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

export default VideoUpload;
