import "./profile.css"
import {Topbar} from "../../components/topbar/Topbar";
import {Leftbar} from "../../components/leftbar/Leftbar";
import {Feed} from "../../components/feed/Feed";
import {ProfileRightbar} from "../../components/rightbar/ProfileRightBar";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/autContext";
import {useParams} from "react-router-dom";

export const Profile = () => {
    const {userId} = useParams();
    const {getUser, token} = useContext(AuthContext);
    const [currUser, setCurrUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(userId, token);
                setCurrUser(userData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [userId, token]);

    return (
        <>
            <Topbar/>
            <div className="profile">
                <Leftbar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            {currUser?.cover_picture ?
                                (<img className="profileCoverImg" src={currUser.cover_picture} alt=""/>)
                                :
                                (<img className="profileCoverImg" src="/assets/person/avatar.jpg" alt=""/>)
                            }

                            {currUser?.profile_picture ?
                                (<img className="profileUserImg" src={currUser.profile_picture} alt=""/>)
                                :
                                (<img className="profileUserImg" src="/assets/person/avatar.jpg" alt=""/>)
                            }
                        </div>
                        <div className="profileInfo">
                            {<h4 className="profileInfoName">{currUser?.full_name}</h4> ||
                                <h4 className="profileInfoName">{currUser?.username}</h4>
                            }
                            {<span className="profileInfoDesc">{currUser?.bio}</span> ||
                                <span className="profileInfoDesc">No description</span>
                            }
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed userId={userId} isProfileFeed={true}/>
                        <ProfileRightbar currUser={currUser}/>
                    </div>
                </div>
            </div>
        </>
    );
};