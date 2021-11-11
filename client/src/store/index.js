import { configureStore } from "@reduxjs/toolkit";
import BreedsReducer from "../slices/BreedsSlice";
import TemperamentsSlice from "../slices/TemperamentsSlice";

export default configureStore({
  reducer: {
    breeds: BreedsReducer,
    temperaments: TemperamentsSlice,
  },
});
