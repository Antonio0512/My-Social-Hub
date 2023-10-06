import {createContext} from "react";
import * as friendService from "../services/friendService"

export const FriendContext = createContext(undefined);

export const FriendProvider = ({children}) => {
    const addFriend = async (userId, friendId, token) => {
        try {
            return await friendService.addFriend(userId, friendId, token);
        } catch (error) {
            throw error;
        }
    };

    const removeFriend = async (userId, friendId, token) => {
        try {
            return await friendService.removeFriend(userId, friendId, token);
        } catch (error) {
            throw error;
        }
    };

    const getFriendships = async (users, token) => {
        try {
            return await friendService.getFriendships(users, token);
        } catch (error) {
            throw error;
        }
    };

    const sendFriendRequest = async (credentials, token) => {
        try {
            return await friendService.sendFriendRequest(credentials, token)
        } catch (error) {
            throw error;
        }
    };


    const friendContextData = {
        addFriend,
        removeFriend,
        getFriendships,
        sendFriendRequest
    };

    return (
        <FriendContext.Provider value={friendContextData}>
            {children}
        </FriendContext.Provider>
    );
};

