import "./post.css"
import {MoreVert} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/autContext";
import {PostContext} from "../../context/postContext";
import {Link} from "react-router-dom";

export const Post = ({post}) => {
    const {token, user} = useContext(AuthContext);
    const {getPostAuthor} = useContext(PostContext);

    const [author, setAuthor] = useState("");

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const authorData = await getPostAuthor(post.id, token);
                setAuthor(authorData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAuthor();
    }, [post.id]);

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${post.author_id}`}>
                            <img className="postProfileImg" src={author?.profile_picture} alt=""/>
                        </Link>
                        <span className="postUsername">{author.username}</span>
                        <span className="postDate">{post.creation_date}</span>
                    </div>
                    <div className="postTopRight">
                        {post.author_id === user.id && <MoreVert/>}
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
            </div>
        </div>
    );
};