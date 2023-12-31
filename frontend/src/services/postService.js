import axios from "axios";

export const addPost = async (credentials, user_id, token) => {
    try {
        const formDataToSend = new FormData();
        formDataToSend.append("content", credentials.content);
        formDataToSend.append("image", credentials.picture);

        const response = await axios.post(
            "/api/posts",
            formDataToSend,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getAllPosts = async (token) => {
    try {
        const response = await axios.get(
            "/api/posts",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data
    } catch (error) {
        throw error;
    }
};

export const getUserPosts = async (userId, token) => {
    try {
        const response = await axios.get(
            `/api/${userId}/posts`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};