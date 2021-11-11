import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  temperaments: [],
};

const temperamentsSlice = createSlice({
  name: "breeds",
  initialState,
  reducers: {
    setTemperaments: (state, action) => {
      state.temperaments = action.payload;
    },
  },
});

export const { setTemperaments } = temperamentsSlice.actions;

export default temperamentsSlice.reducer;
