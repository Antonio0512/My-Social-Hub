import "./profile.css"
import {Topbar} from "../../components/topbar/Topbar";
import {Leftbar} from "../../components/leftbar/Leftbar";
import {Feed} from "../../components/feed/Feed";
import {ProfileRightbar} from "../../components/rightbar/ProfileRightBar";
import {useContext} from "react";
import {AuthContext} from "../../context/autContext";

export const Profile = () => {
    const {user} = useContext(AuthContext);

    return (
        <>
            <Topbar/>
            <div className="profile">
                <Leftbar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src="/assets/person/person-1.jpeg" alt=""/>
                            <img className="profileUserImg" src="/assets/person/person-1.jpeg" alt=""/>
                        </div>
                        <div className="profileInfo">
                            {user.full_name
                                ?
                                (<h4 className="profileInfoName">{user.full_name}</h4>)
                                :
                                (<h4 className="profileInfoName">{user.username}</h4>)
                            }
                            {user.bio
                                ?
                                (<span className="profileInfoDesc">{user.bio}</span>)
                                :
                                (<span className="profileInfoDesc">No description</span>)
                            }
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed/>
                        <ProfileRightbar/>
                    </div>
                </div>
            </div>
        </>
    );
};