import {useContext} from "react";

import {AuthContext} from "../context/autContext";
import {Navigate, Outlet} from "react-router-dom";

export const AuthRouteGuard = ({children}) => {
    const {isAuthenticated} = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    return children ? children : <Outlet/>;
};