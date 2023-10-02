import axios from "axios";

export const addFriend = async (userId, friendId, token) => {
    try {
        const response = await axios.post(
            "api/friends/add",
            {
                user_id: userId,
                friend_id: friendId
            },
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