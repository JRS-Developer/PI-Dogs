import BreedsList from "./BreedsList";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";

const BreedsPagination = ({ breedsPerPage }) => {
  const { filteredBreeds } = useSelector((state) => state.breeds);
  const { items, changePage, currentPage } = usePagination(filteredBreeds, 8);

  return (
    <>
      <BreedsList breeds={items} />
      <Pagination
        changePage={changePage}
        allItems={filteredBreeds}
        itemsPerPage={breedsPerPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default BreedsPagination;
