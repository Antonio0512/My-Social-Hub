import "./usersList.css";
import {useContext} from "react";
import {AuthContext} from "../../context/autContext";
import {FriendContext} from "../../context/friendContext";
import {Topbar} from "../../components/topbar/Topbar";
import {Link} from "react-router-dom";

export const UsersList = () => {
    const {users, token, user} = useContext(AuthContext);
    const {addFriend} = useContext(FriendContext);

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
                    {users.map((user) => (
                        <div key={user.id} className="searchUserBox">
                            <Link className="searchLink" to={`/profile/${user.id}`}>
                                {user.profile_picture ? (
                                    <img
                                        src={user.profile_picture}
                                        alt={user.full_name}
                                        className="searchProfilePic"
                                    />
                                ) : (
                                    <img
                                        src="/assets/person/avatar.jpg"
                                        alt={user.username}
                                        className="searchProfilePic"
                                    />
                                )}
                                <p className="searchUsername">{user.username}</p>
                            </Link>
                            <button onClick={() => onSubmit(user.id)} className="addFriendButton">
                                + Add Friend
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
