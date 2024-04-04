import { RouteType } from "../../types/routeTypes"
import Login from "../../pages/home/SignIn"
import Register from "../../pages/home/Register"
import Dashboard from "../../pages/home/Dashboard"
import UserProf from "../../pages/profiles/UserProf"
import PetProf from "../../pages/profiles/PetProf"
import PetAccess from "../../pages/profiles/PetAccess"
import PetCreate from "../../pages/profiles/PetCreate"
import Post from "../../pages/ViewPost"

const routes: Array<RouteType> = [
    { path: "/", element: <Dashboard /> },
    { path: "/sign-in", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/user-profile/:id", element: <UserProf /> },
    { path: "/pet-profile/:id", element: <PetProf /> },
    { path: "/pet-access", element: <PetAccess /> },
    { path: "/pet-create", element: <PetCreate /> },
    { path: "/post", element: <Post /> }
]

export default routes
