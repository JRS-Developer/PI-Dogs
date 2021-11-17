const SET_BREEDS = "breeds/set_breeds";
const FILTER_BY_TYPE = "breeds/filter_type";
const FILTER_BY_TEMPERAMENTS = "breeds/filter_temp";
const FILTER_SORT = "breeds/filter_sort";

const setBreeds = (breeds) => ({
  type: SET_BREEDS,
  payload: breeds,
});

const filterByType = (type) => ({
  type: FILTER_BY_TYPE,
  payload: type,
});

const filterByTemperament = (temp) => ({
  type: FILTER_BY_TEMPERAMENTS,
  payload: temp,
});

const sortBreeds = (param, order) => ({
  type: FILTER_SORT,
  payload: {
    param,
    order,
  },
});

export { setBreeds, filterByType, filterByTemperament, sortBreeds };
export { SET_BREEDS, FILTER_BY_TYPE, FILTER_BY_TEMPERAMENTS, FILTER_SORT };
