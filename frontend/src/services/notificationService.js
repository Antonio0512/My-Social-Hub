import axios from "axios";

export const getFriendshipNotifications = async (userId, token) => {
    try {
        const response = await axios.get(
            `/api/${userId}/friend-requests`,
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