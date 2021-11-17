import { combineReducers } from "redux";
import breeds from "./BreedsReducer";
import temperaments from "./TemperamentsReducer";

export default combineReducers({
  breeds,
  temperaments,
});
