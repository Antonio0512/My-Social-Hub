import "./rightbar.css"

export const Rightbar = () => {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/gift.png" alt=""/>
                    <span
                        className="birthdayText"><b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.</span>
                </div>
                <img className="rightbarAd" src="/assets/ad.png" alt=""/>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg"
                                 src="/assets/person/person-1.jpeg"
                                 alt=""
                            />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Doe</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg"
                                 src="/assets/person/person-1.jpeg"
                                 alt=""
                            />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Doe</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg"
                                 src="/assets/person/person-1.jpeg"
                                 alt=""
                            />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Doe</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg"
                                 src="/assets/person/person-1.jpeg"
                                 alt=""
                            />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Doe</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg"
                                 src="/assets/person/person-1.jpeg"
                                 alt=""
                            />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Doe</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg"
                                 src="/assets/person/person-1.jpeg"
                                 alt=""
                            />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Doe</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg"
                                 src="/assets/person/person-1.jpeg"
                                 alt=""
                            />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Doe</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};