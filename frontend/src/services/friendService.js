import axios from "axios";

export const addFriend = async (userId, friendId, token) => {
    try {
        const response = await axios.post(
            "/api/friends/add",
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


export const removeFriend = async (userId, friendId, token) => {
    try {
        const response = await axios.delete(
            `/api/friends/remove/${userId}/${friendId}`,
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


export const getFriendships = async (users, token) => {

    const userIds = users.map(user => user.id).join(",");

    try {
        const response = await axios.get(
            "/api/friendships/status",
            {
                params: {user_ids: userIds},
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const sendFriendRequest = async (credentials, token) => {
    try {
        const response = await axios.post(
            "/api/friend-request",
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