import { setToastData } from "./Redux/Futures/userSlice"
import supabase from "./client"

const fetchData = async userData => {
    try {
        const { error } = await supabase.from("users").insert(userData)
        if (error) throw new Error(error.message)

    } catch (error) { console.log(error) }
}

const showToast = (() => {
    //create a closure around the timeout variable to control user spams(:
    let timeout;

    return (dispatch, text, status, delay = 2000) => {
        clearTimeout(timeout);
        dispatch(setToastData({ text, status, showToast: 1 }));

        timeout = setTimeout(() => {
            dispatch(setToastData({ showToast: false }));
        }, delay);
    };
})();


export {
    fetchData,
    showToast
}