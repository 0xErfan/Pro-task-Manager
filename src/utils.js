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

const getCookie = () => document.cookie.includes("userData") && JSON.parse(document.cookie.replace("userData=", ""))

const getParsedTodos = todos => {
    let allUserTodos = todos
    allUserTodos = allUserTodos.map(todo => typeof todo != "string" ? todo : JSON.parse(todo))
    return allUserTodos;
}

const padStarter = val => {
    const newVal = val.toString().padStart(2, "0")

    if (isNaN(newVal)) return "00"

    return newVal
}

function checkTaskStatus(time) {
    if (!time) return;
    !time.time && (time.time = "AM")

    const currentDateTime = new Date();
    const userHour = time.hour + (time.time === "PM" ? 12 : 0); // Convert to 24-hour format if PM
    const userMin = time.min;
    const todoDateTime = new Date(currentDateTime);
    
    todoDateTime.setHours(userHour, userMin, 0, 0);
    
    if (todoDateTime > currentDateTime) { return "Today" }
    if (todoDateTime * 12 * 60 * 60 * 1000 > currentDateTime && time.time == "PM") { return "Tomorrow" }
    if (todoDateTime < currentDateTime) { return "Passed" }
}

export {
    showToast,
    setCookie,
    getCookie,
    getParsedTodos,
    padStarter,
    checkTaskStatus
}