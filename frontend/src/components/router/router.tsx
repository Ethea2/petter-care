import { RouteType } from "../../types/routeTypes"
import Login from "../../pages/home/SignIn"
import Register from "../../pages/home/Register"
import Dashboard from "../../pages/home/Dashboard"
import UserProf from "../../pages/profiles/UserProf"
import PetProf from "../../pages/profiles/PetProf"
import Post from "../../pages/ViewPost"

const routes: Array<RouteType> = [
    { path: "/", element: <Dashboard /> },
    { path: "/sign-in", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/user-profile", element: <UserProf /> },
    { path: "/pet-profile", element: <PetProf /> },
    { path: "/post", element: <Post /> },
]

export default routes
