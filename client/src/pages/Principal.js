import BreedsPagination from "../components/BreedsSection/BreedsPagination";
import FilterSection from "../components/FilterSection/FilterSection";
import useGetBreeds from "../hooks/useGetBreeds";

const Principal = () => {
  const { error, loading } = useGetBreeds();

  return (
    <>
      <FilterSection />
      {loading && !error ? (
        <div>Loading...</div>
      ) : (
          <BreedsPagination breedsPerPage={8} />
        )}
      {error && <div>An error has ocurred</div>}
    </>
  );
};

export default Principal;
