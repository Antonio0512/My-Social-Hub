import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/home/Home";
import {Profile} from "./pages/profile/Profile"
import {Login} from "./pages/login/Login";
import {Register} from "./pages/register/Register";
import {AuthRouteGuard} from "./routeGuards/authRouteGuard";
import {AuthProvider} from "./context/autContext";
import {UsersList} from "./pages/usersList/UsersList";
import {ProfileUpdate} from "./pages/profileUpdate/ProfileUpdate";
import {PostProvider} from "./context/postContext";

function App() {
    return (
        <AuthProvider>
            <PostProvider>
                <Routes>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route element={<AuthRouteGuard/>}>
                        <Route path={"/profile/:userId"} element={<Profile/>}/>
                        <Route path={"/profile/update/:userId"} element={<ProfileUpdate/>}/>
                        <Route path={"/users"} element={<UsersList/>}/>
                        <Route path={"/"} element={<Home/>}/>
                    </Route>
                </Routes>
            </PostProvider>
        </AuthProvider>
    );
}

export default App;
