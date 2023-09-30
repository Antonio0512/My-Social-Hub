import "./topbar.css"
import {Chat, Notifications, Person, Search} from "@mui/icons-material"
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/autContext";

export const Topbar = () => {
    const navigate = useNavigate();

    const {getUsers, token, user} = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState({
        "search": ""
    });

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);


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

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to={"/"} className="logo">My Social Hub</Link>
            </div>
            <div className="topbarCenter">
                <form onSubmit={e => onSubmit(e)} className="searchbar">
                    <Search className="searchIcon"/>
                    <input
                        placeholder="Search for friend, post or video"
                        className="searchInput"
                        type="text"
                        name="search"
                        value={searchQuery.search}
                        onChange={e => onChange(e)}
                    />
                </form>
            </div>

            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
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
                    {user.profile_picture
                        ?
                        (<img
                                src={user.profile_picture}
                                alt=""
                                className="topbarImg"
                                onClick={toggleDropdown}
                            />
                        )
                        :
                        (<img
                            src="/assets/person/avatar.jpg"
                            alt=""
                            className="topbarImg"
                            onClick={toggleDropdown}
                        />)
                    }
                    {isDropdownVisible && (
                        <div className="profileDropdown">
                            <Link className="profileDropdownItem" to={`/profile/${user.id}`}>Profile</Link>
                            <Link className="profileDropdownItem" to={`/profile/update/${user.id}`}>Settings</Link>
                            {/*<button onClick={logout}>Logout</button>*/}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};