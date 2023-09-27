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