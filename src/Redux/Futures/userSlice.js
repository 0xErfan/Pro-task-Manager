import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../utils";
import supabase from "../../client";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async ({ userName, password, showToast, setCookie, reseter }) => {
        try {
            const { data, error } = await supabase.from("users").select().eq("name", userName);

            if (error) {
                throw new Error(error);
            }

            if (data.length === 1 && data[0].password === password) {
                setCookie(JSON.stringify(data[0]), 20);
                reseter();
                setToastData({ text: "Incorrect usrename or password!", status: 0, showToast: 1 })
                return data[0];
            } else { throw new Error("Incorrect username or password."); }

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState: {
        isOnline: true,
        isLogin: false,
        userData: {},
        toastData: { showToast: false, text: null, status: 0, loader: 0 },
    },
    reducers: {
        isOnlineChanger: (state, action) => { state.isOnline = action.payload },
        setToastData: (state, action) => { state.toastData = action.payload },
        isLoginSetter: (state, action) => state.isLogin = action.payload
    },
    extraReducers: builder => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.toastData = { text: "You logged in successfully", status: 1, showToast: 1 };
                state.userData = action.payload;
            })
            .addCase(userLogin.rejected, state => { state.toastData = { text: "Incorrect usrename or password!", status: 0, showToast: 1 } })
    }
})

export default userSlice.reducer
export const { isOnlineChanger, setToastData, isLoginSetter } = userSlice.actions