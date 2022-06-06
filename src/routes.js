import { LOGIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE } from "./utils/consts";
import Login from "./components/Login"
import Shop from "./components/Shop"
import Profile from "./components/Profile"

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login/>
    },
    {
        path: SHOP_ROUTE,
        Component: <Shop/>
    }
]

export const privateRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: <Profile/>
    }
]