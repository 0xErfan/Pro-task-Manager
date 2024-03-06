import { createSlice } from "@reduxjs/toolkit";

const OnbordingSlice = createSlice({
    name: "onboarding",
    initialState: 0,
    reducers: {
        nextPage: (state) => state + 1,
        prevePage: (state) => state - 1,
        changeByMount: (state, action) => state = action.payload
    }
});

export const { nextPage, prevePage, changeByMount } = OnbordingSlice.actions;
export default OnbordingSlice.reducer;