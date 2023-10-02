import {createContext} from "react";
import * as postService from "../services/postService"

export const PostContext = createContext(undefined);

export const PostProvider = ({children}) => {

    const addPost = async (credentials, user_id, token) => {
        try {
            return await postService.addPost(credentials, user_id, token);
        } catch (error) {
            throw error;
        }
    };

    const getAllPosts = async (token) => {
        try {
            return await postService.getAllPosts(token);
        } catch (error) {
            throw error
        }
    };

    const getUserPosts = async (userId, token) => {
        try {
            return await postService.getUserPosts(userId, token)
        } catch (error) {
            throw error;
        }
    };


    const postContextData = {
        addPost,
        getAllPosts,
        getUserPosts
    };


    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );
};

