import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/home/Home";
import {Profile} from "./pages/profile/Profile"
import {Login} from "./pages/login/Login";
import {Register} from "./pages/register/Register";

function App() {
    return (
        <Routes>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/profile"} element={<Profile/>}/>
            <Route path={"/"} element={<Home/>}/>
        </Routes>
    );
}

export default App;
