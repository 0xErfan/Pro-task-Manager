import { createSlice } from "@reduxjs/toolkit";
import supabase from "../../client";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, getParsedTodos, setCookie } from "../../utils";

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

export const taskUpdater = createAsyncThunk(
    "user/todosUpdaterr",
    async (infos, { getState }) => {

        try {

            const { taskId, action, newTodo, data: updatedTaskData } = infos
            const { todos, id } = getState().user.userData

            let newUpdatedTasks

            if (action == "delete") {
                newUpdatedTasks = getParsedTodos(todos).filter(task => task.id != taskId)
            } else if (action == "add") {
                newUpdatedTasks = [...getState().user.userData.todos, newTodo];
            } else {
                newUpdatedTasks = getParsedTodos(getCookie().todos)

                newUpdatedTasks.some(task => {
                    if (task.id == taskId) {
                        if (updatedTaskData?.title) {
                            task.description = updatedTaskData.desc
                            task.title = updatedTaskData.taskTitle
                        } else task.isComplete = !task.isComplete
                        return true
                    }
                })
            }

            const { data, error } = await supabase.from("users").update({ todos: newUpdatedTasks }).eq("id", id).select()

            if (error) { throw new Error(error.message) }

            console.log(data);
            return data

        } catch (error) {
            console.error("Async thunk error:", error);
            throw error;
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        isOnline: true,
        isLogin: false,
        isLoading: false,
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
        isLoginSetter: (state, action) => { state.isLogin = action.payload ? true : false, state.userData = action.payload || getCookie() }
    },
    extraReducers: builder => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.userData = action.payload;
                location.href = "/"
            })
            .addCase(userLogin.rejected, state => { state.toastData = { text: "Incorrect usrename or password!", status: 0, showToast: 1 } })
            
            .addCase(taskUpdater.fulfilled, (state, action) => { state.isLoading = false, state.userData.todos = action.payload[0].todos, setCookie(JSON.stringify(action.payload[0])) })
            .addCase(taskUpdater.pending, state => { state.isLoading = true })
            .addCase(taskUpdater.rejected, (state, action) => { console.log(action.error), state.isLoading = false })
    }
})

export default userSlice.reducer
export const { isOnlineChanger, setToastData, isLoginSetter, setOverlayShow, setAddTodoShow } = userSlice.actions