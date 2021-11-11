import useFetch from "use-http";
import { useEffect, useCallback } from "react";
import { setBreeds } from "../slices/BreedsSlice";
import { useDispatch } from "react-redux";
import BreedsList from "../components/BreedsSection/BreedsList";
import FilterSection from '../components/FilterSection/FilterSection'

const Principal = () => {
  const { get, response, loading, error } = useFetch();
  const dispatch = useDispatch();

  const getBreeds = useCallback(async () => {
    const data = await get("dogs");
    response.ok && dispatch(setBreeds(data));
  }, [get, response, dispatch]);

  useEffect(() => {
    getBreeds();
  }, [getBreeds]);

  return (
    <div>
      <h1>Yo soy la pagina principal</h1>
      <FilterSection />
      {loading && !error ? <div>Loading...</div> : <BreedsList />}
      {error && <div>An error has ocurred</div>}
    </div>
  );
};

export default Principal;
