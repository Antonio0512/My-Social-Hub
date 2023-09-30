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
        current_city: "",
        birth_place: "",
        relationship_status: "",
        profile_picture: null,
        cover_picture: null,
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
                    current_city: userData.current_city || "",
                    birth_place: userData.birth_place || "",
                    relationship_status: userData.relationship_status || "",
                    profile_picture: userData.profile_picture || "",
                    cover_picture: userData.cover_picture || "",
                });
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [user.id]);

    const {username, email, full_name, bio, current_city, birth_place, relationship_status} = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleProfilePictureChange = (e) => {
        setFormData({...formData, profile_picture: e.target.files[0] || null});
    };

    const handleCoverPictureChange = (e) => {
        setFormData({...formData, cover_picture: e.target.files[0] || null});
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await update(formData, user.id, token);
            navigate(`/profile/${user.id}`);
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
                        <form className="profileUpdateBox"
                              method="post"
                              onSubmit={(e) => onSubmit(e)}
                              encType="multipart/form-data"
                        >
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
                            <input placeholder="Current City"
                                   className="profileUpdateInput"
                                   type="text"
                                   name="current_city"
                                   value={current_city}
                                   onChange={e => onChange(e)}
                                   autoComplete="text"
                            />
                            <input placeholder="birth_place"
                                   className="profileUpdateInput"
                                   type="text"
                                   name="birth_place"
                                   value={birth_place}
                                   onChange={e => onChange(e)}
                                   autoComplete="text"
                            />

                            <select
                                className="profileUpdateInput"
                                name="relationship_status"
                                value={relationship_status}
                                onChange={e => onChange(e)}
                            >
                                <option value="">Relationship Status</option>
                                <option value="married">Married</option>
                                <option value="taken">Taken</option>
                                <option value="single">Single</option>
                            </select>


                            <label htmlFor="profile_picture">Profile Picture:
                                <input
                                    type="file"
                                    id="profile_picture"
                                    name="profile_picture"
                                    onChange={(e) => {
                                        handleProfilePictureChange(e)
                                    }}
                                />
                            </label>

                            <label htmlFor="cover_picture">Cover Picture:
                                <input
                                    type="file"
                                    id="cover_picture"
                                    name="cover_picture"
                                    onChange={(e) => {
                                        handleCoverPictureChange(e)
                                    }}
                                />
                            </label>
                            <AuthErrorMessage message={error}/>

                            <button className="profileUpdateButton">Update</button>
                            <Link className="linkLogin" to={"/"}>
                                Back to Home
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};