import "./Input.css"
import Home from "./Pages/Home"
import { useRoutes } from "react-router-dom"
import appRoutes from "./routes"
function App() {
    const routes = useRoutes(appRoutes)

    return (
        <>
            
            {routes}
        </>
    )
}

export default App