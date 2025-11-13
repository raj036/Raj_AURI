import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

return (
  <div className="pagination">
    <div className="pagination-left">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>
    </div>

    <div className="pagination-center">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={i + 1 === currentPage ? "active" : ""}
          onClick={() => handlePageClick(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>

    <div className="pagination-right">
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  </div>
);

};

export default Pagination;
