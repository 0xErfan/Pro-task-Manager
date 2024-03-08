import { configureStore } from "@reduxjs/toolkit";
import onbordingReducer from "../Redux/Futures/OnbordingSlice";
import userReducer from "./Futures/userSlice";

export default configureStore({
    reducer: {
        OnbordingPage: onbordingReducer,
        user: userReducer
    }
});
