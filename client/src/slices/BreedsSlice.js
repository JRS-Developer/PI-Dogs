import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  breeds: [],
  filteredBreeds: [],
  isFiltering: {
    temperaments: false,
    name: false,
    sort: false,
    type: false
  }
}

const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {
    setBreeds: (state, action) => {
      state.breeds = action.payload
    },
  }
})

export const { setBreeds, addBreed } = breedsSlice.actions

export default breedsSlice.reducer

