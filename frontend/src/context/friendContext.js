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

    const getFriendships = async (users, token) => {
        try {
            return await friendService.getFriendships(users, token);
        } catch (error) {
            throw error;
        }
    };


    const friendContextData = {
        addFriend,
        getFriendships
    };

    return (
        <FriendContext.Provider value={friendContextData}>
            {children}
        </FriendContext.Provider>
    );
};

