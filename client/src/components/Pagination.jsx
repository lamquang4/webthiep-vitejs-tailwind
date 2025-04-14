import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="mt-8 flex justify-center gap-4 items-center">
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="border-[1.2px] border-[#333] h-[30px] w-[30px] cursor-pointer text-center flex justify-center items-center rounded-full text-[1rem] font-semibold"
        >
          <GrFormPrevious size={23} />
        </button>
      )}

      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number + 1}
          onClick={() => handlePageChange(number + 1)}
          className={`border-[1.2px] border-[#333] h-[30px] w-[30px] font-medium cursor-pointer text-center flex justify-center items-center rounded-full text-[1rem] font-semibold" ${
            currentPage === number + 1 ? "bg-[#333333] text-white" : ""
          } `}
        >
          {number + 1}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="border-[1.2px] border-[#333] h-[30px] w-[30px] cursor-pointer text-center flex justify-center items-center rounded-full text-[1rem] font-semibold"
        >
          <GrFormNext size={23} />
        </button>
      )}
    </div>
  );
}

export default Pagination;
