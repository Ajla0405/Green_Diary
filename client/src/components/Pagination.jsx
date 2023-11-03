import React from "react";
import "../pages/PlantsPage.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination-container">
      <ul className="pagination">
        {currentPage > 1 && (
          <li key="previous" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </li>
        )}
        {currentPage < totalPages && (
          <li key="more" onClick={() => onPageChange(currentPage + 1)}>
            More
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
