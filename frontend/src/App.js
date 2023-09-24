import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/home/Home";
import {Topbar} from "./components/topbar/Topbar";

function App() {
    return (
        <Routes>
            <Route path={"/topbar"} element={<Topbar/>}/>
            <Route path={"/"} element={<Home/>}/>
        </Routes>
    );
}

export default App;
