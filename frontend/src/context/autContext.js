import {createContext} from "react";
import * as authService from '../services/authService'
import {useLocalStorage} from "../hooks/useLocalStorage";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useLocalStorage("token", {});

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

    const authContextData = {
        token: token?.access_token,
        register,
        login
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
};
