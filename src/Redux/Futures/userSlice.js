import { createSlice } from "@reduxjs/toolkit";
import supabase from "../../client";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, getParsedTodos, setCookie, showToast } from "../../utils";

const initialState = {
    isOnline: true,
    isLogin: false,
    isLoading: false,
    updater: false,
    imgError: false,
    overlayShow: false,
    addTodoShow: false,
    userData: document.cookie.includes("userData") && JSON.parse(document.cookie.replace("userData=", "")),
    toastData: { showToast: false, text: null, status: 0, loader: 0 },
}

export const userLogin = createAsyncThunk(
    'user/userLogin',
    async ({ userName, password, reseter }, { dispatch }) => {

        try {

            if (!navigator.onLine) {
                showToast(dispatch, "Check your internet connection !", 0, 3000)
                throw new Error()
            }

            const { data, error } = await supabase.from("users").select().eq("name", userName);

            if (error) {
                console.log(error.message);
                showToast(dispatch, "Incorrect usrename or password!", 0, 2000)
                throw new Error(error)
            }


            if (data && data.length && data[0].password === password) {
                setCookie(JSON.stringify(data[0]), 20);
                reseter && reseter();
                showToast(dispatch, "You logged in successfully !", 1, 3000)
                return data[0];
            } else {
                showToast(dispatch, "Incorrect usrename or password!", 0, 2000)
                throw new Error("error")
            }

        } catch (error) { throw new Error(error) }
    }
);

export const taskUpdater = createAsyncThunk(
    "user/todosUpdaterr",
    async (infos, { getState, dispatch }) => {

        try {

            if (!navigator.onLine) {
                showToast(dispatch, "Check your internet connection !", 0, 3000)
                throw new Error()
            }

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
                            } else if (updatedTaskData?.category) {
                                task.category = updatedTaskData.category
                            } else if (updatedTaskData?.time) {
                                task.time = updatedTaskData.time
                            } else task.isComplete = !task.isComplete
                            return true
                        }
                    })
                    break;
            }

            const { data, error } = await supabase.from("users").update({ todos: newUpdatedTasks }).eq("id", id).select()

            if (error) { throw new Error(error.message) }

            return data

        } catch (error) { throw error }
    }
)

export const userDataUpdater = createAsyncThunk(
    "user/userDataUpdater",
    async (infos, { getState, dispatch }) => {

        try {

            if (!navigator.onLine) {
                showToast(dispatch, "Check your internet connection !", 0, 3000)
                throw new Error()
            }

            const { id, userImg } = getState().user.userData
            const { action, newName, newPass } = infos

            let userDataProp, updatedData


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

            if (error) {
                showToast(dispatch, "This username aleready exists !", 0, 2500)
                throw new Error(error.message)
            }

            return { ...data, userImg: getState().user.userData.userImg }

        } catch (error) { throw error }
    }
)

export const userProfileImgUploader = createAsyncThunk(
    "user/userProfileUpdate",
    async (info, { getState, dispatch }) => {

        try {

            if (!navigator.onLine) {
                showToast(dispatch, "Check your internet connection !", 0, 3000)
                throw new Error()
            }

            showToast(dispatch, "Uploading...", 1, 2000)

            const { file, action } = info
            const { id } = getState().user.userData
            const { data, error } = await supabase.storage.from("profile")[action == "get" ? "getPublicUrl" : "upload"](`${id}_profile/user_${id}_profile`, file || "", { upsert: true })
            if (error) throw new Error(error.message)

            dispatch(setUpdater())

            return data.publicUrl + `?id:${Math.random() * 9999}` // to make the img tag url set new received address and not catch the last url

        } catch (error) { throw error }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        isOnlineChanger: (state, action) => { state.isOnline = action.payload },
        setToastData: (state, action) => { state.toastData = action.payload },
        setOverlayShow: (state, action) => { state.overlayShow = action.payload },
        setAddTodoShow: (state, action) => { state.addTodoShow = action.payload },
        setUpdater: state => { state.updater = !state.updater },
        setImgError: (state, action) => { state.imgError = action.payload },
        isLoginSetter: (state, action) => { state.isLogin = action.payload ? true : false, state.userData = action.payload || getCookie() }
    },
    extraReducers: builder => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => { state.userData = action.payload, location.reload() })
            .addCase(taskUpdater.fulfilled, (state, action) => { state.isLoading = false, state.userData.todos = action.payload[0].todos, setCookie(JSON.stringify({ ...state.userData, todos: action.payload[0].todos })) })
            .addCase(userProfileImgUploader.fulfilled, (state, action) => { state.isLoading = false, state.userData.userImg = action.payload, setCookie(JSON.stringify({ ...state.userData, userImg: action.payload })) })
            .addCase(userDataUpdater.fulfilled, (state, action) => {
                const data = action.payload[0]
                data.userImg = action.payload.userImg
                state.isLoading = false, state.userData = action.payload[0], setCookie(JSON.stringify(data))
            })
    }
})

export default userSlice.reducer
export const { isOnlineChanger, setToastData, isLoginSetter, setOverlayShow, setAddTodoShow, setUpdater, setImgError } = userSlice.actions