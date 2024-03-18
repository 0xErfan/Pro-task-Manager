import "./Input.css"
import { useRoutes } from "react-router-dom"
import appRoutes from "./routes"
import useOnline from "./Hooks/useOnline"
import { useDispatch, useSelector } from "react-redux"
import { isOnlineChanger } from "./Redux/Futures/userSlice"
import { useEffect } from "react"
import Toast from "./components/Toast"
import OverlayFilter from "./components/OverlayFilter"
import Nav from "./components/Nav"

function App() {

    const routes = useRoutes(appRoutes)
    const isOnline = useOnline()
    const dispatch = useDispatch()

    const { userData, isLogin, toastData } = useSelector(store => store.user)
    const { showToast, text, status, loader } = toastData

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