import "./Input.css"
import { useRoutes } from "react-router-dom"
import appRoutes from "./routes"
import useOnline from "./Hooks/useOnline"
import { useDispatch, useSelector } from "react-redux"
import { isLoginSetter, isOnlineChanger } from "./Redux/Futures/userSlice"
import { useEffect } from "react"
import Toast from "./components/Toast"
import { getCookie } from "./utils"

function App() {
    const routes = useRoutes(appRoutes)
    const isOnline = useOnline()
    const dispatch = useDispatch()

    const { showToast, text, status, loader } = useSelector(store => store.user.toastData)

    useEffect(() => { dispatch(isOnlineChanger(isOnline)) }, [isOnline])

    return (
        <>
            <Toast showToast={showToast} text={text} status={status} loader={loader} />
            {routes}
            {/* <Nav /> */}
        </>
    )
}

export default App