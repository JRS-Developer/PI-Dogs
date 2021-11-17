import {
  SET_BREEDS,
  FILTER_SORT,
  FILTER_BY_TEMPERAMENTS,
  FILTER_BY_TYPE,
} from "../actions/BreedsActions";
import { isUUID } from "../helpers/uuid";
import { sortByString, sortByNumber } from "../helpers/sorts";

const getNumberInString = (string) =>
  Number(string.replace(/(^\d+)(.+$)/i, "$1"));

const sortBreeds = (breeds, param, order) => {
  return breeds.sort((a, b) => {
    a = a[param];
    b = b[param];
    let numA = getNumberInString(a);
    if (isNaN(numA)) {
      return sortByString(a, b, order);
    } else if (typeof numA === "number") {
      let numB = getNumberInString(b);
      return sortByNumber(numA, numB, order);
    }
    return 0;
  });
};

const initialState = {
  breeds: [],
  filteredBreeds: [],
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
    case FILTER_BY_TYPE: {
      const { breeds } = state;
      const type = action.payload;

      const newBreeds = type
        ? breeds.filter((b) =>
          type === "real" ? Number.isInteger(b.id) : isUUID(b.id)
        )
        : breeds;

      return {
        ...state,
        filteredBreeds: newBreeds,
      };
    }
    case FILTER_BY_TEMPERAMENTS: {
      const { breeds } = state;
      const temp = action.payload;
      const newBreeds = breeds.filter((b) => b.temperament?.includes(temp));

      return {
        ...state,
        filteredBreeds: newBreeds,
      };
    }
    case FILTER_SORT: {
      const { param, order } = action.payload;
      const { breeds } = state;
      const newBreeds = sortBreeds(breeds, param, order);

      return {
        ...state,
        filteredBreeds: newBreeds,
      };
    }
    default:
      return state;
  }
}
