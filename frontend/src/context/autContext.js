import {createContext, useState} from "react";
import * as authService from '../services/authService'
import {useLocalStorage} from "../hooks/useLocalStorage";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useLocalStorage("token", {});
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
            const token = await authService.loginUser(credentials);
            setToken(token);
        } catch (error) {
            throw error
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


    const authContextData = {
        token: token?.access_token,
        users,
        register,
        login,
        getUsers
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
};
