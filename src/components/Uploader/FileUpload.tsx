import React, { useState, useRef } from "react";
import "./FileUpload.css";
import Button from "../button/button";

const FileUpload = () => {
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
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {!fileName ? (
        <div
          className={` relative w-[360px] bg-[#E5F0FA99] min-h-[188px] flex flex-col justify-center items-center  border-2 border-customBorder border-dashed rounded-lg`}
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
          />
          <div className="text-center min-w-[198px] h-[128px]">
            <div>
              <svg
                width="51"
                height="50"
                viewBox="0 0 51 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_998_4398)">
                  <path
                    d="M15.0834 37.5C12.4839 37.5 9.99098 36.5123 8.15291 34.7541C6.31484 32.996 5.28223 30.6114 5.28223 28.125C5.28223 25.6386 6.31484 23.254 8.15291 21.4959C9.99098 19.7377 12.4839 18.75 15.0834 18.75C15.6973 16.015 17.4933 13.6114 20.0763 12.0682C21.3552 11.304 22.7889 10.7741 24.2954 10.5086C25.8019 10.2431 27.3518 10.2472 28.8565 10.5208C30.3612 10.7944 31.7914 11.3321 33.0652 12.1031C34.3391 12.8741 35.4317 13.8634 36.2808 15.0144C37.1298 16.1655 37.7187 17.4558 38.0137 18.8117C38.3086 20.1675 38.304 21.5624 38 22.9167H40.0834C42.0172 22.9167 43.8719 23.6849 45.2394 25.0523C46.6068 26.4198 47.375 28.2745 47.375 30.2083C47.375 32.1422 46.6068 33.9969 45.2394 35.3643C43.8719 36.7318 42.0172 37.5 40.0834 37.5H38"
                    stroke="#17498A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19.25 31.25L25.5 25L31.75 31.25"
                    stroke="#17498A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M25.5 25V43.75"
                    stroke="#17498A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_998_4398">
                    <rect
                      width="50"
                      height="50"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
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
      ) : (
        <div className=" w-[360px] px-3 bg-[#E5F0FA99] min-h-[76px] flex  justify-between items-center  border-2 border-customBorder  rounded-lg">
          <div>{fileName}</div>
          <div className="font-bold text-xs">{fileName}</div>
          <div>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.55247 6.00003L10.8856 1.66686C11.0382 1.5143 11.0382 1.26696 10.8856 1.11442C10.7331 0.96188 10.4857 0.96186 10.3332 1.11442L6.00001 5.44759L1.66686 1.11442C1.5143 0.96186 1.26696 0.96186 1.11442 1.11442C0.96188 1.26698 0.96186 1.51432 1.11442 1.66686L5.44757 6.00001L1.11442 10.3332C0.96186 10.4857 0.96186 10.7331 1.11442 10.8856C1.19069 10.9619 1.29067 11 1.39065 11C1.49063 11 1.59059 10.9619 1.66688 10.8856L6.00001 6.55247L10.3332 10.8856C10.4094 10.9619 10.5094 11 10.6094 11C10.7094 11 10.8093 10.9619 10.8856 10.8856C11.0382 10.7331 11.0382 10.4857 10.8856 10.3332L6.55247 6.00003Z"
                fill="#737273"
                stroke="#737273"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUpload;
