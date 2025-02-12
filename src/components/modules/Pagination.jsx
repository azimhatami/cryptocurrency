import { useState } from "react";

function Pagination({ page, setPage }) {
  const prevHandler = () => {
    if (page <= 1) {
      return;
    }
    setPage((page) => page - 1);
  };

  const nextHandler = () => {
    if (page >= 10) {
      return;
    }
    setPage((page) => page + 1);
  };

  return (
    <div className="flex items-center justify-center !mt-18">
      <div className="pagination flex items-center gap-x-4">
        <button
          className={`${page === 1 ? "disabled cursor-not-allowed" : "cursor-pointer"} bg-[#31363F]/80 w-18 
            !px-3 rounded-md outline-none hover:bg-[#31363F] 
            hover:font-medium transition-all delay-150 duration-300 ease-in-out`}
          onClick={prevHandler}
        >
          perv
        </button>
        <p className={`${page === 1 ? "selected" : null}`}>1</p>
        <p className={`${page === 2 ? "selected" : null}`}>2</p>
        {page > 2 && page < 9 && (
          <>
            <span>...</span>
            <p className="selected">{page}</p>
          </>
        )}
        <span>...</span>
        <p className={`${page === 9 ? "selected" : null}`}>9</p>
        <p className={`${page === 10 ? "selected" : null}`}>10</p>
        <button
          className="bg-[#31363F]/80 w-18 !px-3 rounded-md cursor-pointer outline-none hover:bg-[#31363F] hover:font-medium transition-all delay-150 duration-300 ease-in-out"
          onClick={nextHandler}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
