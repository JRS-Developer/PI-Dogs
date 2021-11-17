import { useDispatch } from "react-redux";
import {
  sortBreeds,
  filterByTemperament,
  filterByType,
} from "../../actions/BreedsActions";
import Input from "../Input/Input";
import useGetTemperaments from "../../hooks/useGetTemperaments";
import useGetBreeds from "../../hooks/useGetBreeds";
import { useState, useEffect } from "react";

const FilterSection = () => {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const { temperaments } = useGetTemperaments();
  const dispatch = useDispatch();
  useGetBreeds(name);

  const handleChangeName = (e) => setQuery(e.target.value);

  const handleChangeType = (e) => dispatch(filterByType(e.target.value));

  const handleChangeTemp = (e) => dispatch(filterByTemperament(e.target.value));

  const handleChangeSort = (e) => {
    const { order, param } = e.target?.selectedOptions[0]?.dataset;
    dispatch(sortBreeds(order, param));
  };

  useEffect(() => {
    const changeName = (value) => setName(value);

    const timeout = setTimeout(() => changeName(query), 500);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div>
      <Input
        placeholder="Search By Name"
        name="name"
        onChange={handleChangeName}
      />
      <select name="temperament" defaultValue="" onChange={handleChangeTemp}>
        <option value="">All</option>
        {temperaments.map((temp) => (
          <option key={temp.name} value={temp.name}>
            {temp.name}
          </option>
        ))}
      </select>
      <select name="type" onChange={handleChangeType}>
        <option value="">All</option>
        <option value="real">Real</option>
        <option value="created">Created</option>
      </select>
      <select name="sort" defaultValue="" onChange={handleChangeSort}>
        <option value="" disabled hidden>
          Sort By
        </option>
        <option data-param="name" data-order="ASC">
          A-Z
        </option>
        <option data-param="name" data-order="DESC">
          Z-A
        </option>
        <option data-param="weight" data-order="ASC">
          Min Weight
        </option>
        <option data-param="weight" data-order="DESC">
          Max Weight
        </option>
      </select>
    </div>
  );
};

export default FilterSection;
