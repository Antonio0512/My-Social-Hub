import axios from "axios";

export const registerUser = async (credentials) => {
    try {
        const response = await axios.post(
            "/api/users",
            JSON.stringify(credentials),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data
    } catch (error) {
        throw error;
    }
};


export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(
            "/api/login",
            JSON.stringify(credentials),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const updateUser = async (formData, user_id, token) => {
    try {
        const formDataToSend = new FormData();
        formDataToSend.append("username", formData.username);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("full_name", formData.full_name);
        formDataToSend.append("bio", formData.bio);
        formDataToSend.append("current_city", formData.current_city);
        formDataToSend.append("birth_place", formData.birth_place);
        formDataToSend.append("relationship_status", formData.relationship_status);
        formDataToSend.append("profile_picture", formData.profile_picture);
        formDataToSend.append("cover_picture", formData.cover_picture);

        const response = await axios.put(`/api/users/${user_id}`, formDataToSend, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getOneUser = async (user_id, token) => {
    try {
        const response = await axios.get(
            `/api/users/${user_id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};


export const getUsers = async (search, token) => {
    try {
        const response = await axios.get(
            `/api/users?q=${search}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};