import "./online.css"

export const Online = () => {
    return (
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
    )
}