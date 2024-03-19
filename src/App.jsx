import "./Input.css"
import { useRoutes } from "react-router-dom"
import appRoutes from "./routes"
import useOnline from "./Hooks/useOnline"
import { useDispatch, useSelector } from "react-redux"
import { isLoginSetter, isOnlineChanger, userProfileImgUploader } from "./Redux/Futures/userSlice"
import { useEffect } from "react"
import Toast from "./components/Toast"
import OverlayFilter from "./components/OverlayFilter"
import Nav from "./components/Nav"
import { getCookie, setCookie } from "./utils"

function App() {

    const routes = useRoutes(appRoutes)
    const isOnline = useOnline()
    const dispatch = useDispatch()

    const { userData, isLogin, toastData, updater } = useSelector(store => store.user)
    const { showToast, text, status, loader, userImg } = toastData

    useEffect(() => { dispatch(isLoginSetter(getCookie())) }, [])

    useEffect(() => {
        if (!updater) return
        isLogin && dispatch(userProfileImgUploader({ action: "get" }))
        console.log("userImgChange");
    }, [updater, userImg])

    useEffect(() => { dispatch(isOnlineChanger(isOnline)) }, [isOnline])

    return (
        <>
            {routes}
            <Toast showToast={showToast} text={text} status={status} loader={loader} />
            <OverlayFilter />
            {userData?.id && <Nav />}
        </>
    )
}

export default App