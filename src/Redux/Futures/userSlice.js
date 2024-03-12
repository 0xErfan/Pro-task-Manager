import { createSlice, current } from "@reduxjs/toolkit";
import supabase from "../../client";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie } from "../../utils";

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

export const newTodoUpdater = createAsyncThunk(
    'user/todoUpdater',
    async (newTodo, { getState }) => {
        try {
            const currentTodos = getState().user.userData.todos;
            const updatedTodos = [...currentTodos, newTodo];

            const { data, error } = await supabase
                .from("users")
                .update({ todos: updatedTodos })
                .eq("id", getState().user.userData.id)
                .select();

            if (error) {
                console.log(error);
                throw new Error(error);
            }

            if (data) {
                return updatedTodos; // Return the updated todos array
            } else {
                throw new Error("Error updating todos");
            }

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
        overlayShow: false,
        addTodoShow: false,
        userData: { todos: [] },
        toastData: { showToast: false, text: null, status: 0, loader: 0 },
    },
    reducers: {
        isOnlineChanger: (state, action) => { state.isOnline = action.payload },
        setToastData: (state, action) => { state.toastData = action.payload },
        setOverlayShow: (state, action) => { state.overlayShow = action.payload },
        setAddTodoShow: (state, action) => { state.addTodoShow = action.payload },
        isLoginSetter: (state, action) => { state.isLogin = action.payload ? true : false, state.userData = action.payload }
    },
    extraReducers: builder => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.userData = action.payload;
                location.href = "/"
            })
            .addCase(userLogin.rejected, state => { state.toastData = { text: "Incorrect usrename or password!", status: 0, showToast: 1 } })
            .addCase(newTodoUpdater.fulfilled, (state, action) => {

                state.userData = { ...state.userData, todos: action.payload };
                setCookie(JSON.stringify(state.userData), 20);
            })
    }
})

export default userSlice.reducer
export const { isOnlineChanger, setToastData, isLoginSetter, setOverlayShow, setAddTodoShow } = userSlice.actions