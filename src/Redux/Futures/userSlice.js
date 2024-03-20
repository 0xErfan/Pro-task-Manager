import { createSlice } from "@reduxjs/toolkit";
import supabase from "../../client";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, getParsedTodos, setCookie, showToast } from "../../utils";



export const userLogin = createAsyncThunk(
    'user/userLogin',
    async ({ userName, password, showToast, setCookie, reseter }, { dispatch }) => {
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
            showToast(dispatch, "Incorrect username or password !", 0, 3000)
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

            switch (action) {
                case "delete":
                    newUpdatedTasks = getParsedTodos(todos).filter(task => task.id != taskId)
                    break;
                case "add":
                    newUpdatedTasks = [...getState().user.userData.todos, newTodo];
                    break;
                default:

                    newUpdatedTasks = getParsedTodos(todos)
                    newUpdatedTasks.some(task => {
                        if (task.id == taskId) {
                            if (updatedTaskData?.taskTitle) {
                                task.description = updatedTaskData.desc
                                task.title = updatedTaskData.taskTitle
                            } else if (updatedTaskData?.isComplete) {
                                task.isComplete = !task.isComplete
                            } else if (updatedTaskData?.time) {
                                task.time = updatedTaskData.time
                            } else task.category = updatedTaskData.category
                            return true
                        }
                    })

                    break;
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

export const userDataUpdater = createAsyncThunk(
    "user/userDataUpdater",
    async (infos, { getState, dispatch }) => {
        showToast(dispatch, "Updating...", 1, 2000)

        const { id } = getState().user.userData
        const { action, newName, newPass } = infos

        let userDataProp, updatedData

        try {

            switch (action) {
                case "changeName":
                    userDataProp = "name"
                    updatedData = newName
                    break;
                case "changePass":
                    userDataProp = "password"
                    updatedData = newPass
                    break;
                default:
                    console.error("Envalid action");
                    break;
            }

            const { data, error } = await supabase.from("users").update({ [userDataProp]: updatedData }).eq("id", id).select()

            if (error) { throw new Error(error.message) }
            dispatch(setUpdater())
            return data

        } catch (error) {
            console.error("Async thunk error:", error);
            throw error;
        }
    }
)

export const userProfileImgUploader = createAsyncThunk(
    "user/userProfileUpdate",
    async (info, { getState, dispatch }) => {
        showToast(dispatch, "Uploading...", 1, 2000)

        const { file, action } = info
        const { id } = getState().user.userData


        try {
            console.log(action);
            const { data, error } = await supabase.storage.from("profile")[action == "get" ? "getPublicUrl" : "upload"](`${id}_profile/user_${id}_profile`, file || "", { upsert: true })

            if (error) throw new Error(error.message)

            dispatch(setUpdater())

            console.log(data);
            return data.publicUrl + `?id:${Math.random() * 9999}`

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
        updater: false,
        overlayShow: false,
        addTodoShow: false,
        userData: document.cookie.includes("userData") && JSON.parse(document.cookie.replace("userData=", "")),
        toastData: { showToast: false, text: null, status: 0, loader: 0 },
    },
    reducers: {
        isOnlineChanger: (state, action) => { state.isOnline = action.payload },
        setToastData: (state, action) => { state.toastData = action.payload },
        setUpdater: state => { state.updater = !state.updater },
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

            .addCase(taskUpdater.fulfilled, (state, action) => { state.isLoading = false, state.userData.todos = action.payload[0].todos, setCookie(JSON.stringify({ ...state.userData, todos: action.payload[0].todos })) })

            .addCase(userProfileImgUploader.fulfilled, (state, action) => { state.isLoading = false, state.userData.userImg = action.payload, setCookie(JSON.stringify({ ...state.userData, userImg: action.payload })) })

            .addCase(userDataUpdater.fulfilled, (state, action) => { state.isLoading = false, state.userData = action.payload[0], setCookie(JSON.stringify(action.payload[0])) })
    }
})

export default userSlice.reducer
export const { isOnlineChanger, setToastData, isLoginSetter, setOverlayShow, setAddTodoShow, setUpdater } = userSlice.actions