import "./share.css"
import {EmojiEmotions, Label, PermMedia, Room} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/autContext";
import {PostContext} from "../../context/postContext";

export const Share = ({isProfileFeed}) => {
    const navigate = useNavigate();

    const {user, token} = useContext(AuthContext);
    const {addPost} = useContext(PostContext);

    const [formData, setFormData] = useState({
        content: "",
        picture: null
    });

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleFileInputChange = (e) => {
        setFormData({...formData, picture: e.target.files[0] || null});
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await addPost(formData, user.id, token);
            if (isProfileFeed) {
                navigate(`/profile/${user.id}`);
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            className="share"
            method="post"
            onSubmit={(e) => onSubmit(e)}
            encType="multipart/form-data"
        >
            <div className="shareWrapper">
                <div className="shareTop">
                    {
                        <img className="shareProfileImg" src={user.profile_picture} alt=""/>
                        ||
                        <img className="shareProfileImg" src="/assets/person/avatar.jpg" alt=""/>
                    }
                    <input
                        className="shareInput"
                        placeholder="What is in your mind?"
                        type="text"
                        name="content"
                        value={formData.content}
                        onChange={e => onChange(e)}
                        autoComplete="text"
                    />
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <label htmlFor="fileInput">
                                <PermMedia htmlColor="tomato" className="shareIcon"/>
                                <span className="shareOptionText">Photo/Video</span>
                            </label>
                            <input
                                style={{display: "none"}}
                                type="file"
                                id="fileInput"
                                accept=".png, .jpg, .jpeg, .gif, .mp4"
                                onChange={handleFileInputChange}
                            />
                        </div>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </form>
    )
}