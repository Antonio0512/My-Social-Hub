import "./profile.css"
import {Topbar} from "../../components/topbar/Topbar";
import {Leftbar} from "../../components/leftbar/Leftbar";
import {Feed} from "../../components/feed/Feed";
import {ProfileRightbar} from "../../components/rightbar/ProfileRightBar";

export const Profile = () => {
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
                            <h4 className="profileInfoName">Antonio Boyanov</h4>
                            <span className="profileInfoDesc">Description for testing purposes.</span>
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