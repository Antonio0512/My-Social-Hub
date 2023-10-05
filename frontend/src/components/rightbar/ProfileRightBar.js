import "./rightbar.css"
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/autContext";
import {Link} from "react-router-dom";

export const ProfileRightbar = ({currUser}) => {
    const {token, getUserFriends} = useContext(AuthContext);
    const [userFriends, setUserFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const userFriendsData = await getUserFriends(currUser?.id, token);
                setUserFriends(userFriendsData);
            } catch (error) {
                console.error(error);
            }
        };
        if (currUser) {
            fetchFriends();
        }
    }, [currUser, token]);

    return (
        <>
            <div className="rightbar">
                <div className="rightbarWrapper">
                    <h4 className="rightbarTitle">User information</h4>
                    <div className="rightbarInfo">
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">City:</span>
                            <span className="rightbarInfoValue">{currUser?.current_city}</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">From:</span>
                            <span className="rightbarInfoValue">{currUser?.birth_place}</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Relationship:</span>
                            <span className="rightbarInfoValue">{currUser?.relationship_status}</span>
                        </div>
                    </div>
                    <h4 className="rightbarTitle">User friends</h4>
                    <div className="rightbarFollowings">
                        {userFriends.map((userFriend) => (
                                <div key={userFriend.id} className="rightbarFollowing">
                                    <Link to={`/profile/${userFriend.id}`}>
                                        <img
                                            src={userFriend.profile_picture || "/assets/person/person-1.jpeg"}
                                            alt=""
                                            className="rightbarFollowingImg"
                                        />
                                    </Link>
                                    <span className="rightbarFollowingName">{userFriend.username}</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};