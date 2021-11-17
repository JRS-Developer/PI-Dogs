import { SET_TEMPERAMENTS } from "../actions/TemperamentsActions";

const initialState = {
  temperaments: [],
};

export default function temperaments(state = initialState, action) {
  switch (action.type) {
    case SET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    default:
      return state;
  }
}
