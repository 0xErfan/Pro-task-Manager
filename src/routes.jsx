import Home from "./Pages/Home";
import Login from "./Pages/Login"
import Register from "./Pages/Register"

const appRoutes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> }
]

export default appRoutes;
