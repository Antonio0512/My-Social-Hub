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


    // const signIn = async (credentials) => {
    //     try {
    //         const userData = await userService.singIn(credentials);
    //         setUser(userData);
    //     } catch (error) {
    //         throw error
    //     }
    // };

    const authContextData = {
        token,
        register
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
};
