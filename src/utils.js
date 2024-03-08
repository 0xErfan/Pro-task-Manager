import { setToastData } from "./Redux/Futures/userSlice"

const showToast = (() => {
    //create a closure around the timeout variable to control user spams(:
    let timeout;

    return (dispatch, text, status, delay = 2000) => {
        clearTimeout(timeout);
        dispatch(setToastData({ text, status, showToast: 1 }));

        timeout = setTimeout(() => {
            dispatch(setToastData({ showToast: false, status }));
        }, delay);
    };
})();

const setCookie = (data, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();

    document.cookie = `userData=${data};${expires};path=/;`
}

const getCookie = () => {
    const cookie = JSON.parse(document.cookie)
    return cookie
}

export {
    showToast,
    setCookie,
    getCookie
}