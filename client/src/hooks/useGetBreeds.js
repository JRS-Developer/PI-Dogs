import useFetch from "use-http";
import { useEffect, useCallback } from "react";
import { setBreeds } from "../actions/BreedsActions";
import { useDispatch, useSelector } from "react-redux";

const useGetBreeds = (name) => {
  const { get, response, loading, error } = useFetch();
  const dispatch = useDispatch();
  const { breeds, filteredBreeds } = useSelector((state) => state.breeds);

  const getBreeds = useCallback(async () => {
    let query = `dogs/`;
    name && (query += `?name=${name}`);

    const data = await get(query);
    response.ok && dispatch(setBreeds(data));
  }, [get, response, dispatch, name]);

  useEffect(() => {
    getBreeds();
  }, [getBreeds]);

  return {
    breeds,
    filteredBreeds,
    loading,
    error,
  };
};

export default useGetBreeds;
