import { useState } from "react";
import { CgChevronLeftO, CgChevronRightO } from 'react-icons/cg'

const Pagination = ({ itemsPerPage, allItems, changePage, currentPage }) => {
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const pages = [];

  for (let i = 1; i < Math.ceil(allItems.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const handlePrevBtn = () => {
    changePage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const handleNextBtn = () => {
    changePage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const renderPageNumbers = pages.map((number) =>
    number < maxPageNumberLimit + 1 && number > minPageNumberLimit ? (
      <li key={number}>
        <button onClick={() => changePage(number)}>{number}</button>
      </li>
    ) : null
  );

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextBtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevBtn}> &hellip; </li>;
  }

  return (
    <ul>
      <li>
        <button onClick={handlePrevBtn} disabled={currentPage === pages[0]}>
          <CgChevronLeftO />
        </button>
      </li>
      {pageDecrementBtn}
      {renderPageNumbers}
      {pageIncrementBtn}
      <li>
        <button
          onClick={handleNextBtn}
          disabled={currentPage === pages[pages.length - 1]}
        >
          <CgChevronRightO />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
