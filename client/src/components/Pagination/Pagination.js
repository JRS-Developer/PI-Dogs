import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "../Button/Button";
import styles from "./Pagination.module.scss";

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
        <Button
          className={`${styles.button} ${
            number === currentPage ? styles.active : ""
            }`}
          onClick={() => changePage(number)}
        >
          {number}
        </Button>
      </li>
    ) : null
  );

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li onClick={handleNextBtn}>
        <Button className={styles.button}>&hellip;</Button>
      </li>
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li onClick={handlePrevBtn}>
        <Button className={styles.button}>&hellip;</Button>
      </li>
    );
  }

  return (
    <ul className={styles.pagination}>
      <li>
        <Button
          className={styles.button}
          onClick={handlePrevBtn}
          disabled={pages.length === 0 || currentPage === pages[0]}
        >
          <FaChevronLeft />
        </Button>
      </li>
      {pageDecrementBtn}
      {renderPageNumbers}
      {pageIncrementBtn}
      <li>
        <Button
          className={styles.button}
          onClick={handleNextBtn}
          disabled={
            pages.length === 0 || currentPage === pages[pages.length - 1]
          }
        >
          <FaChevronRight />
        </Button>
      </li>
    </ul>
  );
};

export default Pagination;
