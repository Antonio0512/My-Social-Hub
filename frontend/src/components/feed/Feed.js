import "./feed.css"
import {Share} from "../share/Share";
import {Post} from "../post/Post";
import {useContext, useEffect, useState} from "react";
import {PostContext} from "../../context/postContext";
import {AuthContext} from "../../context/autContext";
import {TailSpin} from "react-loader-spinner";

export const Feed = ({userId, isProfileFeed}) => {

    const {getAllPosts, getUserPosts} = useContext(PostContext);
    const {user, token, logout} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userId) {
            if (isProfileFeed) {
                const fetchUserPosts = async () => {
                    try {
                        const postsData = await getUserPosts(userId, token);
                        setPosts(postsData);
                    } catch (error) {
                        if (error.response.data.detail === "JWT token expired: Signature has expired") {
                            logout();
                        } else {
                            console.error(error);
                        }
                    } finally {
                        setIsLoading(false);
                    }
                };
                fetchUserPosts();
            }
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
                } finally {
                    setIsLoading(false);
                }
            };
            fetchAllPosts();
        }
    }, [userId, isProfileFeed]);


    return (
        <div className="feed">
            {isLoading ? (
                    <div className="loader-container">
                        <TailSpin
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                    </div>
                ) :
                <div className="feedWrapper">
                    {(isProfileFeed && user.id === Number(userId)) || !isProfileFeed ? (
                        <Share isProfileFeed={isProfileFeed}/>
                    ) : null}
                    {posts.map((post) => (
                        <Post key={post.id} post={post}/>
                    ))}
                </div>
            }
        </div>
    );
};