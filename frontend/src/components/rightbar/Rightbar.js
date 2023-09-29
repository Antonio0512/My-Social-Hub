import "./rightbar.css"
import {Online} from "../online/Online";

export const Rightbar = () => {
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/icons/gift.png" alt=""/>
                    <span
                        className="birthdayText"><b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.</span>
                </div>
                <img className="rightbarAd" src="/assets/ad.png" alt=""/>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    <Online/>
                </ul>
            </div>
        </div>
    );
};