import "./topbar.css"
import {Chat, Notifications, Person, Search} from "@mui/icons-material"
import {Link} from "react-router-dom";

export const Topbar = () => {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to={"/"} className="logo">My Social Hub</Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for friend, post or video" className="searchInput"/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">4</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                </div>
                <Link to={"/profile"}>
                    <img src="/assets/person/person-1.jpeg" alt="" className="topbarImg"/>
                </Link>
            </div>
        </div>
    );
};