import axios from "axios";

export const sendFriendRequest = async (sender, receiver, token) => {
    try {
        const response = await axios.post(
            "/notifications",
            JSON.stringify({sender, receiver}),
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