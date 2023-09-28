import axios from "axios";

export const registerUser = async (credentials) => {
    try {
        const response = await axios.post(
            "/users",
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
            "/login",
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


export const updateUser = async (credentials, user_id, token) => {
    try {
        const response = await axios.put(
            `/users/${user_id}`,
            JSON.stringify(credentials),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getOneUser = async (user_id, token) => {
    try {
        const response = await axios.get(
            `/users/${user_id}`,
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
            `/users?q=${search}`,
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