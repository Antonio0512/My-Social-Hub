import "./online.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/autContext";

export const Online = () => {
    const {token, getUsers} = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsersData = async () => {
            try {
                const usersData = await getUsers("", token);
                setUsers(usersData);
            } catch (error) {
                console.error(error);
            }
        };
        getUsersData();
    }, [token]);

    const online_users = users.filter((user) => user.is_online === true);
    return (
        <ul className="rightbarFriendList">

            {online_users.length !== 0 ? online_users.map((online_user) => (
                    <li className="rightbarFriend" key={online_user.id}>
                        <div className="rightbarProfileImgContainer">
                            <img
                                className="rightbarProfileImg"
                                src={online_user.profile_picture || "/assets/person/avatar.jpg"}
                                alt={`${online_user.username}'s profile`}
                            />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">{online_user.username}</span>
                    </li>
                ))
                : <p>No online friends</p>
            }
        </ul>
    );
};
