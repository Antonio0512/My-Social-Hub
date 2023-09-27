import axios from "axios";

export const registerUser = async (credentials) => {
    try {
        const response = await axios.post(
            "/users",
            credentials,
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