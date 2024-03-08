import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isOnline: true,
        isLogin: false,
        userData: {},
        toastData: { showToast: false, text: null, status: 0, loader: 0 },
        todos: []
    },
    reducers: {
        isOnlineChanger: (state, action) => { state.isOnline = action.payload },
        todosUpdater: (state, action) => {
            const { newTodo, id } = action.payload
            console.log(id);
        },
        setToastData: (state, action) => {
            return { ...state, toastData: action.payload }
        }
    }
})

export default userSlice.reducer
export const { isOnlineChanger, todosUpdater, setToastData } = userSlice.actions