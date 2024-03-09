import Home from "./Pages/Home";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import NotFound from "./Pages/NotFound"

const appRoutes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/*", element: <NotFound/> }
]

export default appRoutes;
