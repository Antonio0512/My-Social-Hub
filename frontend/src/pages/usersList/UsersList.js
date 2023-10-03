import "./usersList.css";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/autContext";
import {FriendContext} from "../../context/friendContext";
import {Topbar} from "../../components/topbar/Topbar";
import {Link} from "react-router-dom";
import {TailSpin} from "react-loader-spinner";


export const UsersList = () => {
    const {users, token, user} = useContext(AuthContext);
    const {addFriend, removeFriend, getFriendships} = useContext(FriendContext);

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

    const onSubmit = async (friendId, isFriend) => {
        try {
            if (!isFriend) {
                await addFriend(user.id, friendId, token)
                setFriendships((prevFriendships) => [
                    ...prevFriendships, {user_id: user.id, friend_id: friendId, status: "Friends"}
                ]);
            } else {
                await removeFriend(user.id, friendId, token);
                setFriendships((prevFriendships) =>
                    prevFriendships.filter((friendship) => friendship.friend_id !== friendId)
                );
            }
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
                {isLoading ? (
                        <div className="loader-container">
                            <TailSpin
                                color="#00BFFF"
                                height={100}
                                width={100}
                            />
                        </div>
                    ) :
                    <div className="searchResults" id="searchResults">
                        {users.map((currUser) => {
                            const isFriend = friendships
                                .some((f) => f.friend_id === currUser.id && f.status === "Friends");
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
                                            onClick={() => onSubmit(currUser.id, isFriend)}
                                            className="friendButton"
                                        >
                                            {isFriend ? "Friends" : "+ Add Friend"}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
        </>
    );
};
