import {
  SET_BREEDS,
  FILTER_BREEDS,
  SET_FILTERING,
} from "../actions/BreedsActions";
import { isUUID } from "../helpers/uuid";
import { sortByString, sortByNumber } from "../helpers/sorts";

const getNumbersInString = (string) =>
  string.match(/\d+\.\d+|\d+\b|\d+(?=\w)/g);

const sortBreedsByName = (breeds, order) => {
  return breeds.sort((a, b) => sortByString(a.name, b.name, order));
};

const sortBreedsByWeight = (breeds, order) => {
  return breeds.sort((a, b) => {
    let [numA1, numA2] = getNumbersInString(a.weight);
    let [numB1, numB2] = getNumbersInString(b.weight);

    // first the num2 of each one because that is the max value, if the max value is undefined, the it will use the first one
    return sortByNumber(numA2 || numA1, numB2 || numB1, order);
  });
};

const sortBreeds = (breeds, param, order) => {
  if (param === "weight") {
    return sortBreedsByWeight(breeds, order);
  } else if (param === "name") {
    return sortBreedsByName(breeds, order);
  }
  return breeds;
};

const filterBreedsByType = (breeds, type) =>
  breeds.filter((b) =>
    type === "real" ? Number.isInteger(b.id) : isUUID(b.id)
  );

const filterBreedsByTemp = (breeds, temp) =>
  breeds.filter((b) => b.temperament?.includes(temp));

const initialState = {
  breeds: [],
  filteredBreeds: [],
  isFiltering: {
    type: "",
    temperament: "",
    sort: {
      value: "", // This is not used, it is only to identify the option to be selected
      param: "",
      order: "",
    },
  },
};

export default function breeds(state = initialState, action) {
  switch (action.type) {
    case SET_BREEDS: {
      return {
        ...state,
        breeds: action.payload,
        filteredBreeds: action.payload,
      };
    }
    case SET_FILTERING: {
      return {
        ...state,
        isFiltering: {
          ...state.isFiltering,
          ...action.payload,
        },
      };
    }
    case FILTER_BREEDS: {
      const { breeds, isFiltering } = state;
      let newBreeds = breeds;

      if (isFiltering.type) {
        const type = isFiltering.type;
        newBreeds = filterBreedsByType(newBreeds, type);
      }
      if (isFiltering.temperament) {
        const temperament = isFiltering.temperament;
        newBreeds = filterBreedsByTemp(newBreeds, temperament);
      }
      if (isFiltering.sort.param) {
        const { param, order } = isFiltering.sort;
        newBreeds = sortBreeds(newBreeds, param, order);
      }

      return {
        ...state,
        filteredBreeds: newBreeds,
      };
    }
    default:
      return state;
  }
}
