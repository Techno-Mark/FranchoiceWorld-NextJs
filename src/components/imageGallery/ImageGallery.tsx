import React from "react";
import Image from "next/image";
import styles from "./imagegallery.module.css";

interface ImageProps {
  id?: string;
  imagePath: string;
  name?: string;
  width?: number;
  height?: number;
  column?: number;
}

interface GalleryProps {
  column: number;
  className?: string;
  galleryImages: ImageProps[];
  imageClass?: string;
}

const ImageGallery: React.FC<GalleryProps> = ({
  column,
  className,
  galleryImages,
  imageClass,
}) => {
  const columns: Array<ImageProps[]> = Array.from({ length: column }, () => []);
  galleryImages.forEach((image, index) => {
    const columnIndex =
      image.column !== undefined ? image.column : index % column;
    columns[columnIndex].push(image);
  });

  return (
    <div className={`flex my-6 md:my-0${className}`}>
      {columns.map((col, colIndex) => (
        <div
          key={colIndex}
          className={`flex flex-col px-2 sm:px-3 odd:mb-6 even:mt-6`}
        >
          {col.map((image, imgIndex) => (
            <Image
              key={imgIndex}
              className={`mb-4 sm:mb-6 last:mb-0 ${styles.image} ${imageClass}`}
              src={image.imagePath}
              alt={image.name || "gallery image"}
              width={image.width || 177}
              height={image.height || 218}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
