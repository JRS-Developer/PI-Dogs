import { useEffect, useCallback } from "react";
import { setTemperaments } from "../actions/TemperamentsActions";
import useFetch from "use-http";
import { useDispatch, useSelector } from "react-redux";

const useGeTemperaments = () => {
  const { temperaments } = useSelector((state) => state.temperaments);
  const { get, response, loading, error } = useFetch();

  const dispatch = useDispatch();

  const getTemperaments = useCallback(async () => {
    const data = await get("temperament");
    response.ok && dispatch(setTemperaments(data));
  }, [response, dispatch, get]);

  useEffect(() => {
    !temperaments.length && getTemperaments();
  }, [temperaments, getTemperaments]);

  return {
    temperaments,
    loading,
    error,
  };
};

export default useGeTemperaments;
