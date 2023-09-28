import "./profileUpdate.css";
import {AuthErrorMessage} from "../../components/errorMessages/authErrorMessages";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState, useEffect} from "react";
import {AuthContext} from "../../context/autContext";
import {Topbar} from "../../components/topbar/Topbar";

export const ProfileUpdate = () => {
    const navigate = useNavigate();

    const {update, user, getUser, token} = useContext(AuthContext);

    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        full_name: "",
        bio: "",
        profile_picture: "",
        cover_picture: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser(user.id, token);
                setFormData({
                    username: userData.username || "",
                    email: userData.email || "",
                    full_name: userData.full_name || "",
                    bio: userData.bio || "",
                    profile_picture: userData.profile_picture || "",
                    cover_picture: userData.cover_picture || "",
                });
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [user.id]);

    const {username, email, full_name, bio, profile_picture, cover_picture} =
        formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await update(formData, user.id, token);
            navigate("/profile");
        } catch (error) {
            setError(error.response.data.detail);
        }
    };

    return (
        <>
            <Topbar/>
            <div className="profileUpdate">
                <div className="profileUpdateWrapper">
                    <div className="profileUpdateLeft">
                        <h3 className="profileUpdateLogo">Profile Update</h3>
                        <span className="profileUpdateDesc">Let people know more about you</span>
                    </div>
                    <div className="profileUpdateRight">
                        <form className="profileUpdateBox" onSubmit={(e) => onSubmit(e)}>
                            <input placeholder="Username"
                                   className="profileUpdateInput"
                                   type="text"
                                   name="username"
                                   value={username}
                                   onChange={e => onChange(e)}
                                   autoComplete="username"
                            />

                            <input placeholder="Email"
                                   className="profileUpdateInput"
                                   type="email"
                                   name="email"
                                   value={email}
                                   onChange={e => onChange(e)}
                                   autoComplete="email"
                            />

                            <input placeholder="Full Name"
                                   className="profileUpdateInput"
                                   type="text"
                                   name="full_name"
                                   value={full_name}
                                   onChange={e => onChange(e)}
                                   autoComplete="text"
                            />

                            <input placeholder="Bio"
                                   className="profileUpdateInput"
                                   type="text"
                                   name="bio"
                                   value={bio}
                                   onChange={e => onChange(e)}
                                   autoComplete="text"
                            />
                            <label htmlFor="profile_picture">Profile Picture:
                                <input placeholder="Profile Picture"
                                       className="profileUpdateInput"
                                       type="file"
                                       id="profile_picture"
                                       name="profile_picture"
                                       value={profile_picture}
                                       onChange={e => onChange(e)}
                                       autoComplete="text"
                                />
                            </label>

                            <label htmlFor="cover_picture">Cover Picture:
                                <input placeholder="Cover Picture"
                                       className="profileUpdateInput"
                                       type="file"
                                       id="cover_picture"
                                       name="cover_picture"
                                       value={cover_picture}
                                       onChange={e => onChange(e)}
                                       autoComplete="text"
                                />
                            </label>
                            <AuthErrorMessage message={error}/>

                            <button className="profileUpdateButton">Sign Up</button>
                            <Link className="linkLogin" to={"/login"}>
                                Log into Account
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};