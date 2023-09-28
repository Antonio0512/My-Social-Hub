import "./usersList.css";
import {useContext} from "react";
import {AuthContext} from "../../context/autContext";
import {Topbar} from "../../components/topbar/Topbar";

export const UsersList = () => {
    const {users} = useContext(AuthContext);
    return (
        <>
            <Topbar/>
            <header>
                <h1>Friend Search</h1>
            </header>
            <div className="container">
                <div className="results" id="searchResults">
                    {users.map((user) => (
                        <div key={user.id} className="user-box">
                            <img
                                src={user.profile_picture}
                                alt={user.full_name}
                                className="profile-pic"
                            />
                            <p>{user.username}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
