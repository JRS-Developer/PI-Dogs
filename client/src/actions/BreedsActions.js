const SET_BREEDS = "breeds/set_breeds";
const FILTER_BREEDS = "breeds/filter_breeds"
const SET_FILTERING = "filter/set_filter"

const setBreeds = (breeds) => ({
  type: SET_BREEDS,
  payload: breeds,
});

const filterBreeds = () => ({
  type: FILTER_BREEDS,
})

const setIsFiltering = (param, value) => ({
  type: SET_FILTERING,
  payload: {
    [param]: value
  }
})

export { setBreeds, filterBreeds, setIsFiltering };
export { SET_BREEDS, SET_FILTERING, FILTER_BREEDS };
