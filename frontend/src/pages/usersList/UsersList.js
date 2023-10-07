import "./usersList.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/autContext";
import {FriendContext} from "../../context/friendContext";
import {Topbar} from "../../components/topbar/Topbar";
import {Link} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";
import {AuthErrorMessage} from "../../components/errorMessages/authErrorMessages";

export const UsersList = () => {
    const {users, token, user} = useContext(AuthContext);
    const {getFriendships, removeFriend, sendFriendRequest} = useContext(FriendContext);

    const [error, setError] = useState("");
    const [friendships, setFriendships] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFriendships = async () => {
            try {
                const friendshipData = await getFriendships(users, token);
                setFriendships(friendshipData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchFriendships();
    }, [user.id, token, users, getFriendships]);

    const handleFriendAction = async (friend, isFriend) => {
        try {
            if (!isFriend) {
                const requestData = {
                    "sender_id": user.id,
                    "recipient_id": friend.id,
                    "message": `${user.username} sent you a friend request`,
                    "read": "False",
                    "notification_type": "friend_request",
                };

                await sendFriendRequest(requestData, token);

                setFriendships((prevFriendships) => [
                    ...prevFriendships,
                    {user_id: user.id, friend_id: friend.id, status: "Requested"},
                ]);
            } else {
                await removeFriend(user.id, friend, token);
                setFriendships((prevFriendships) =>
                    prevFriendships.filter((friendship) => friendship.friend_id !== friend.id)
                );
            }
        } catch (error) {
            setError(error.response.data.detail);
        }
    };

    return (
        <>
            <Topbar/>
            <header>
                <h1 className="searchTitle">Friend Search</h1>
            </header>
            <div className="searchContainer">
                {isLoading ? (
                    <div className="loader-container">
                        <TailSpin color="#00BFFF" height={100} width={100}/>
                    </div>
                ) : (
                    <div className="searchResults" id="searchResults">
                        {users.map((currUser) => {
                            const isFriend = friendships.some(
                                (f) =>
                                    f.friend_id === currUser.id &&
                                    f.status === "Friends"
                            );
                            return (
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

                                    {user.id !== currUser.id && (
                                        <button
                                            onClick={() => handleFriendAction(currUser, isFriend)}
                                            className="friendButton"
                                        >
                                            {isFriend ? (
                                                currUser.status === "Friends" ? "Friends" : "Requested"
                                            ) : (
                                                "+ Add Friend"
                                            )}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                        <AuthErrorMessage message={error}/>
                    </div>
                )}
            </div>
        </>
    );
};
