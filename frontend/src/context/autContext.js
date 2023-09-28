import {createContext, useState} from "react";
import * as authService from '../services/authService'
import {useLocalStorage} from "../hooks/useLocalStorage";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useLocalStorage("auth", {});
    const [users, setUsers] = useState([]);

    const register = async (credentials) => {
        try {
            await authService.registerUser(credentials);
        } catch (error) {
            throw error
        }
    };


    const login = async (credentials) => {
        try {
            const user = await authService.loginUser(credentials);
            setUser(user);
        } catch (error) {
            throw error
        }
    };

    const update = async (credentials, user_id, token) => {
        try {
            return await authService.updateUser(credentials, user_id, token);
        } catch (error) {
            throw error;
        }
    };

    const getUsers = async (search, token) => {
        try {
            const result = await authService.getUsers(search, token);
            setUsers(result);
            return result;
        } catch (error) {
            throw error;
        }
    };

    const getUser = async (user_id, token) => {
        try {
            return await authService.getOneUser(user_id, token);
        } catch (error) {
            throw error;
        }
    };

    const authContextData = {
        user: user?.user,
        users,
        token: user?.access_token,
        register,
        login,
        update,
        getUser,
        getUsers
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
};
