import "./rightbar.css"

export const ProfileRightbar = ({currUser}) => {
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
                        <div className="rightbarFollowing">
                            <img
                                src="/assets/person/person-1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">John Carter</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img
                                src="/assets/person/person-1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">John Carter</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img
                                src="/assets/person/person-1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">John Carter</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img
                                src="/assets/person/person-1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">John Carter</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img
                                src="/assets/person/person-1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">John Carter</span>
                        </div>
                        <div className="rightbarFollowing">
                            <img
                                src="/assets/person/person-1.jpeg"
                                alt=""
                                className="rightbarFollowingImg"
                            />
                            <span className="rightbarFollowingName">John Carter</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};