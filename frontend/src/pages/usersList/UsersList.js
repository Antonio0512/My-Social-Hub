import "./usersList.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/autContext";
import {FriendContext} from "../../context/friendContext";
import {Topbar} from "../../components/topbar/Topbar";
import {Link} from "react-router-dom";

export const UsersList = () => {
    const {users, token, user} = useContext(AuthContext);
    const {addFriend, getFriendships} = useContext(FriendContext);

    const [friendships, setFriendships] = useState([]);

    useEffect(() => {
        const fetchFriendships = async () => {
            try {
                const friendshipData = await getFriendships(users, token);
                setFriendships(friendshipData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFriendships();
    }, [user.id, token, users]);

    const onSubmit = async (friendId) => {
        try {
            await addFriend(user.id, friendId, token)
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Topbar/>
            <header>
                <h1 className="searchTitle">Friend Search</h1>
            </header>
            <div className="searchContainer">
                <div className="searchResults" id="searchResults">
                    {users.map((currUser) => (
                        <div key={currUser.id} className="searchUserBox">
                            <Link className="searchLink" to={`/profile/${currUser.id}`}>
                                {currUser.profile_picture ? (
                                    <img
                                        src={currUser.profile_picture}
                                        alt={currUser.full_name}
                                        className="searchProfilePic"
                                    />
                                ) : (
                                    <img
                                        src="/assets/person/avatar.jpg"
                                        alt={currUser.username}
                                        className="searchProfilePic"
                                    />
                                )}
                                <p className="searchUsername">{currUser.username}</p>
                            </Link>

                            {user.id !== currUser.id &&
                                (friendships.some(
                                    (friendship) =>
                                        friendship.user_id === user.id &&
                                        friendship.friend_id === currUser.id
                                ) ? (
                                    <button onClick={() => onSubmit(currUser.id)} className="removeFriendButton">
                                        Friends
                                    </button>
                                ) : (
                                    <button onClick={() => onSubmit(currUser.id)} className="addFriendButton">
                                        + Add Friend
                                    </button>
                                ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
