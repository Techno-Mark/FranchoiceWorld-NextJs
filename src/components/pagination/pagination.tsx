import React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import styles from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, "...", totalPages);
      } else if (currentPage > totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const formatPageNumber = (page: number) => {
    return page < 10 ? `0${page}` : `${page}`;
  };

  return (
    <div className="flex justify-center mt-3 md:mt-6">
      <button
        onClick={handlePrevPage}
        className={`mx-2 border border-[var(--text-color)] rounded-full ${styles.paginationButton}`}
        disabled={currentPage === 1}
      >
        <GoArrowLeft className="font-bolder text-[22px]" />
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`mx-1 rounded-full ${styles.paginationButton} ${
            page === currentPage
              ? "bg-[var(--footer-bg)] text-white font-bold"
              : "hover:bg-gray-100 border border-[rgba(115,114,115,0.2)] font-medium"
          } ${typeof page !== "number" ? '!opacity-50 hover:bg-transparent':''}`}
          disabled={typeof page !== "number"}
        >
          {typeof page === "number" ? formatPageNumber(page) : page}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        className={`mx-2 border border-[var(--text-color)] rounded-full ${styles.paginationButton}`}
        disabled={currentPage === totalPages}
      >
        <GoArrowRight className="font-bolder text-[22px]" />
      </button>
    </div>
  );
};

export default Pagination;
