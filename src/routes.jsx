import Home from "./Pages/Home";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import NotFound from "./Pages/NotFound"
import Calender from "./Pages/Calender"
import TaskEdit from "./Pages/TaskEdit";

const appRoutes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/calender", element: <Calender /> },
    { path: "/task-edit/:id", element: <TaskEdit /> },
    { path: "/*", element: <NotFound /> }
]

export default appRoutes;
