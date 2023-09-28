import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/home/Home";
import {Profile} from "./pages/profile/Profile"
import {Login} from "./pages/login/Login";
import {Register} from "./pages/register/Register";
import {AuthRouteGuard} from "./routeGuards/authRouteGuard";
import {AuthProvider} from "./context/autContext";
import {UsersList} from "./pages/usersList/UsersList";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/users"} element={<UsersList/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route element={<AuthRouteGuard/>}>
                    <Route path={"/profile"} element={<Profile/>}/>
                    <Route path={"/"} element={<Home/>}/>
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
