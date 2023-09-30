import "./feed.css"
import {Share} from "../share/Share";
import {Post} from "../post/Post";
import {useContext, useEffect, useState} from "react";
import {PostContext} from "../../context/postContext";

export const Feed = () => {
    const {getAllPosts} = useContext(PostContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getAllPosts();
                setPosts(postsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                {posts.map(
                    <Post/>
                )}

            </div>
        </div>
    );
};