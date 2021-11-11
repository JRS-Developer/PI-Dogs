import { setTemperaments } from "../../slices/TemperamentsSlice";
import useFetch from "use-http";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const FilterSection = () => {
  const { get, response } = useFetch();
  const { temperaments } = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();

  const getTemperaments = useCallback(async () => {
    const data = await get("temperament");
    response.ok && dispatch(setTemperaments(data));
  }, [response, dispatch, get]);

  useEffect(() => {
    getTemperaments();
  }, [getTemperaments]);

  return (
    <div>
      <input placeholder="Search By Name" name="name" />
      <input placeholder="Temperaments" list="temperaments" />
      <datalist id="temperaments" name="temperaments">
        {temperaments.map((temp) => (
          <option key={temp.name} value={temp.name} />
        ))}
      </datalist>
      <select name="type">
        <option value="all">All</option>
        <option value="real">Real</option>
        <option value="created">Created</option>
      </select>
      <select name="order">
        <option value="" disabled selected hidden>
          Sort By
        </option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="min_weight">Min Weight</option>
        <option value="max_weight">Max Weight</option>
      </select>
    </div>
  );
};

export default FilterSection;
