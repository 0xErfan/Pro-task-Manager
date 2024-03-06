import { configureStore } from "@reduxjs/toolkit";
import onbordingReducer from "../Redux/Futures/OnbordingSlice";

export default configureStore({
    reducer: {
        OnbordingPage: onbordingReducer
    }
});
