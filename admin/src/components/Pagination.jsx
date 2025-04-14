import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="my-[20px] flex justify-center items-center gap-[15px]">
      {currentPage > 1 && (
        <button
          className="border border-[#808080] h-[32px] w-[32px] cursor-pointer text-center flex justify-center items-center text-[1rem] font-[550] p-[6px]"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <GrFormPrevious size={22} />
        </button>
      )}

      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number + 1}
          onClick={() => setCurrentPage(number + 1)}
          className={`border border-[#808080] h-[32px] w-[32px] cursor-pointer text-center flex justify-center items-center text-[1rem] font-[550] ${
            currentPage === number + 1 ? "!bg-[#22BAA0] !text-white" : ""
          }`}
        >
          {number + 1}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="border border-[#808080] h-[32px] w-[32px] cursor-pointer text-center flex justify-center items-center text-[1rem] font-[550] p-[6px]"
        >
          <GrFormNext size={22} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
