import React from "react";


const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  function goToNextPage() {
    if(currentPage===pages[pages.length-1])
    return
    setCurrentPage((page) => page + 1);
  }
  function goToPreviousPage() {
    if(currentPage===1)
    return
  setCurrentPage((page) => page - 1);
}
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }
  return (
    <div className="flex justify-center">
       
      <div className="flex rounded-md mt-8">
      <a
          href="#"
          className="py-2 px-4 leading-tight bg-white border border-gray-200 text-green-700 border-r-0 ml-0 rounded-l hover:bg-green-500 hover:text-white"
          onClick={()=> goToPreviousPage()}>
          <span>Previous</span>
        </a>
      {pages.map((page, index) => {
        return(
        <a
          href="#"
          className="py-2 px-4 leading-tight bg-white border border-gray-200 text-green-700 border-r-0 hover:bg-green-500 hover:text-white"
          key={index}
          onClick={() => setCurrentPage(page)}>
          {page}
        </a>
        );
      })}
      <a
          href="#"
          className="py-2 px-4 leading-tight bg-white border border-gray-200 text-green-700 rounded-r hover:bg-green-500 hover:text-white"
        onClick={()=> goToNextPage()}>
          <span>Next</span>
        </a>
      </div>
    </div>
  );
};

export default Pagination;
