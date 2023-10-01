import "./online.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/autContext";

export const Online = () => {
    const {token, getOnlineUsers} = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsersData = async () => {
            try {
                const usersData = await getOnlineUsers(token);
                setUsers(usersData);
            } catch (error) {
                console.error(error);
            }
        };
        getUsersData();
    }, [token]);

    return (
        <ul className="rightbarFriendList">

            {users.length !== 0 ? users.map((user) => (
                    <li className="rightbarFriend" key={user.id}>
                        <div className="rightbarProfileImgContainer">
                            <img
                                className="rightbarProfileImg"
                                src={user.profile_picture || "/assets/person/default-avatar.png"}
                                alt={`${user.username}'s profile`}
                            />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">{user.username}</span>
                    </li>
                ))
                : <p>No online friends</p>
            }
        </ul>
    );
};
