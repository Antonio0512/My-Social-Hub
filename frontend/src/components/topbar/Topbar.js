import "./topbar.css";
import {Chat, Notifications, Person, Search} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../context/autContext";
import {FriendshipNotification} from "../notifications/FriendshipNotification";

export const Topbar = () => {
    const navigate = useNavigate();

    const {getUsers, token, user, logout} = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState({
        search: "",
    });

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    const onChange = (e) => setSearchQuery({...searchQuery, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await getUsers(searchQuery.search, token);
            navigate("/users");
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const toggleNotification = () => {
        setIsNotificationVisible(!isNotificationVisible);
    };

    const handleOutsideClick = (event) => {
        if (isDropdownVisible && !event.target.closest(".profileDropdownContainer")) {
            setIsDropdownVisible(false);
        }

        if (isNotificationVisible && !event.target.closest('.notificationsDropdown')) {
            setIsNotificationVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleOutsideClick);

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [isDropdownVisible]);

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to={"/"} className="logo">
                    My Social Hub
                </Link>
            </div>
            <div className="topbarCenter">
                <form onSubmit={(e) => onSubmit(e)} className="searchbar">
                    <Search className="searchIcon"/>
                    <input
                        placeholder="Search for friend, post or video"
                        className="searchInput"
                        type="text"
                        name="search"
                        value={searchQuery.search}
                        onChange={(e) => onChange(e)}
                    />
                </form>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem" onClick={toggleNotification}>
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    {isNotificationVisible &&
                        <FriendshipNotification/>
                    }
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">4</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                </div>
                <div className="profileDropdownContainer">
                    {user.profile_picture ? (
                        <img src={user.profile_picture} alt="" className="topbarImg" onClick={toggleDropdown}/>
                    ) : (
                        <img src="/assets/person/avatar.jpg" alt="" className="topbarImg" onClick={toggleDropdown}/>
                    )}
                    {isDropdownVisible && (
                        <div className="profileDropdown">
                            <Link className="profileDropdownItem" to={`/profile/${user.id}`}>
                                Profile
                            </Link>
                            <Link className="profileDropdownItem" to={`/profile/update/${user.id}`}>
                                Settings
                            </Link>
                            <Link className="profileDropdownItem" to={"/login"} onClick={logout}>
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
