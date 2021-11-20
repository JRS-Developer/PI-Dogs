import { useDispatch } from "react-redux";
import { filterBreeds, setIsFiltering } from "../../actions/BreedsActions";
import Input from "../Input/Input";
import useGetTemperaments from "../../hooks/useGetTemperaments";
import useGetBreeds from "../../hooks/useGetBreeds";
import { useState, useEffect } from "react";
import styles from "./FilterSection.module.scss";
import Select from "../Select/Select";
import { useSelector } from 'react-redux'

const FilterSection = () => {
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const { temperaments } = useGetTemperaments();
  const dispatch = useDispatch();
  const { breeds } = useGetBreeds(name);
  const isFiltering = useSelector((state) => state.breeds.isFiltering)

  // This function changes the query value, when the query values changes, then execute the useffect that is under, when it is executed, then it execute the setName function after some seconds, and when the name is changed, then executes the useGetBreeds with that name. Really crazy.
  const handleChangeName = (e) => setQuery(e.target.value);

  const handleChangeSort = (e) => {
    const { name, value } = e.target;
    const { order, param } = e.target?.selectedOptions[0]?.dataset;
    dispatch(setIsFiltering(name, { value, param, order }));
    dispatch(filterBreeds());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setIsFiltering(name, value));
    dispatch(filterBreeds());
  };

  useEffect(() => {
    const changeName = (value) => setName(value);

    const timeout = setTimeout(() => changeName(query), 500);
    return () => clearTimeout(timeout);
  }, [query]);

  // When the query name changes, the breeds changes, then we filter them
  useEffect(() => {
    dispatch(filterBreeds())
  }, [breeds, dispatch])

  return (
    <div className={styles.container}>
      <Input
        placeholder="Search By Name"
        name="name"
        onChange={handleChangeName}
      />
      <Select name="temperament" defaultValue={isFiltering.temperament} onChange={handleChange}>
        <option value="">All</option>
        {temperaments.map((temp) => (
          <option key={temp.name} value={temp.name}>
            {temp.name}
          </option>
        ))}
      </Select>
      <Select name="type" onChange={handleChange} defaultValue={isFiltering.type}>
        <option value="">All</option>
        <option value="real">Real</option>
        <option value="created">Created</option>
      </Select>
      <Select name="sort" defaultValue={isFiltering.sort.value} onChange={handleChangeSort}>
        <option value="" data-param="name" data-order="ASC">
          Sort By
        </option>
        <option value="asc name" data-param="name" data-order="ASC">
          A-Z
        </option>
        <option value="desc name" data-param="name" data-order="DESC">
          Z-A
        </option>
        <option value="min_weight" data-param="weight" data-order="ASC">
          Min Weight
        </option>
        <option value="max_weight" data-param="weight" data-order="DESC">
          Max Weight
        </option>
      </Select>
    </div>
  );
};

export default FilterSection;
