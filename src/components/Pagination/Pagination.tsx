"use client";
import React, {useState, useEffect} from "react";
import ReactPaginate from "react-paginate";
import { adPropsTypes } from "../../types/Ad.types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type paginationPropsTypes = {
    AllItems: adPropsTypes[],
    itemPerPage: number,
    setShowItemsPagination: React.Dispatch<React.SetStateAction<adPropsTypes[] | null>>
}

const Pagination:React.FC<paginationPropsTypes> = ({AllItems, itemPerPage, setShowItemsPagination}) => {
  const [currentPageInPagination, setCurrentPageInPagination] = useState<number>(1);
  const [shownItems, setShownItems] = useState<adPropsTypes[]>([]);

  //for calculate of pagination
  useEffect(() => {
    if (AllItems) {
      let lastIndex = currentPageInPagination * itemPerPage;
      let firstIndex = lastIndex - itemPerPage;
      let partShowItems = AllItems.slice(firstIndex, lastIndex);
      setShowItemsPagination(partShowItems);
      setShownItems(partShowItems);
    }
  }, [AllItems, currentPageInPagination, itemPerPage]);

  //onChange method of pagination
  const paginate = async ({ selected }: { selected: number }) => { 
    window.scrollTo(0, 100); //scroll down screen
    setCurrentPageInPagination(selected + 1);
  };

  return (
    <>
      {shownItems.length < AllItems.length ? (
        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(AllItems.length / itemPerPage)}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
          nextLabel={<span className="flex item-center min-h-[38px] min-w-[38px] rounded-md"><span className="leading-10">بعد</span><ChevronLeftIcon className="w-4 ms-2 text-gray-900 text-bold dark:text-white"/></span>}
          previousLabel={<span className="flex item-center min-h-[38px] min-w-[38px] rounded-md"><ChevronRightIcon className="w-4 me-2 text-gray-900 text-bold dark:text-white"/><span className="leading-10">قبل</span></span>}
          pageClassName="text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-white/10 hover:bg-gray-200"
          pageLinkClassName="min-h-[38px] min-w-[38px] flex justify-center items-center dark:text-white"
          previousClassName="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10  hover:bg-gray-200"
          previousLinkClassName=""
          nextClassName="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10  hover:bg-gray-200"
          nextLinkClassName=""
          breakLabel="···"
          breakClassName=""
          breakLinkClassName=""
          containerClassName="flex items-center justify-center gap-x-1 mt-16"
          activeClassName="min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:text-white"
          renderOnZeroPageCount={null}
          hrefBuilder={(page, pageCount) => (page >= 1 && page <= pageCount ? `?page=${page}` : "#")}
          hrefAllControls={true}
        />
      ) : null}
    </>
  );
}

export default Pagination;
