import axios from "axios";

export const addPost = async (credentials, user_id, token) => {
    try {
        const formDataToSend = new FormData();
        formDataToSend.append("content", credentials.content);
        formDataToSend.append("picture", credentials.picture);

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