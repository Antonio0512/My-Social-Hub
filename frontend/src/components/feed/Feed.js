import "./feed.css"
import {Share} from "../share/Share";
import {Post} from "../post/Post";
import {useContext, useEffect, useState} from "react";
import {PostContext} from "../../context/postContext";
import {AuthContext} from "../../context/autContext";

export const Feed = ({userId, isProfileFeed}) => {
    const {getAllPosts, getUserPosts} = useContext(PostContext);
    const {user, token, logout} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        if (isProfileFeed) {
            const fetchUserPosts = async () => {
                try {
                    const postsData = await getUserPosts(user.id, token);
                    setPosts(postsData);
                } catch (error) {
                    if (error.response.data.detail === "JWT token expired: Signature has expired") {
                        logout();
                    } else {
                        console.error(error);
                    }
                }
            };
            fetchUserPosts();
        } else {
            const fetchAllPosts = async () => {
                try {
                    const postsData = await getAllPosts(token);
                    setPosts(postsData);
                } catch (error) {
                    if (error.response.data.detail === "JWT token expired: Signature has expired") {
                        logout();
                    } else {
                        console.error(error);
                    }
                }
            };
            fetchAllPosts();
        }
    }, [userId, isProfileFeed]);


    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {posts.map((post) => (
                    <Post key={post.id} post={post}/>
                ))}
            </div>
        </div>
    );
};