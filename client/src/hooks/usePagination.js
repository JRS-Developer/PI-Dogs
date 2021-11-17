import { useState, useEffect } from "react";

const usePagination = (items = [], itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastBreed = currentPage * itemsPerPage;
  const indexOfFirstBreed = indexOfLastBreed - itemsPerPage;
  const currentItems = items.slice(indexOfFirstBreed, indexOfLastBreed);

  useEffect(() => {
    // When the items changes, then reset the currentPage
    setCurrentPage(1);
  }, [items]);

  const changePage = (number) => setCurrentPage(number);

  return {
    items: currentItems,
    changePage,
    currentPage
  };
};

export default usePagination;
