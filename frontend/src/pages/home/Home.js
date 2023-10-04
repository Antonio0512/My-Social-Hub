import "./home.css"
import {Topbar} from "../../components/topbar/Topbar";
import {Leftbar} from "../../components/leftbar/Leftbar";
import {Feed} from "../../components/feed/Feed";
import {Rightbar} from "../../components/rightbar/Rightbar";
import {useSocket} from "../../services/socketService";
import {useContext} from "react";
import {AuthContext} from "../../context/autContext";

export const Home = () => {
    const {user} = useContext(AuthContext);
    useSocket(user?.id);

    return (
        <>
            <Topbar/>
            <div className="homeContainer">
                <Leftbar/>
                <Feed isProfileFeed={false}/>
                <Rightbar/>
            </div>
        </>
    );
};
