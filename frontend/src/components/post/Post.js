import "./post.css"
import {MoreVert} from "@mui/icons-material";
import {useContext} from "react";
import {AuthContext} from "../../context/autContext";
import {Link} from "react-router-dom";
import {calculate_time_since_post} from "./timeUtils";

export const Post = ({post}) => {
    const {user} = useContext(AuthContext);

    const timeSincePost = calculate_time_since_post(post.creation_date);

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${post.author.id}`}>
                            <img className="postProfileImg" src={post.author?.profile_picture} alt=""/>
                        </Link>
                        <div className="postUsernamePostDateContainer">
                            <span className="postUsername">{post.author.username}</span>
                            <span className="postDate">{timeSincePost}</span>
                        </div>
                    </div>
                    <div className="postTopRight">
                        {post.author.id === user.id && <MoreVert/>}
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.content}</span>
                    <img className="postImg" src={post.image_url} alt=""/>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="/assets/icons/like.png" alt=""/>
                        <img className="likeIcon" src="/assets/icons/heart.png" alt=""/>
                        <span className="postLikeCounter">32 people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">9 comments</span>
                    </div>
                </div>
                <div className="postActions">
                    <button className="likeButton">Like</button>
                    <button className="commentButton">Comment</button>
                    <button className="postShareButton">Share</button>
                </div>
            </div>
        </div>
    );
};