import "./login.css"
import {Link} from "react-router-dom";

export const Login = () => {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialHub</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on MySocialhub.
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input className="loginInput" placeholder="Email"/>
                        <input className="loginInput" placeholder="Password"/>
                        <button className="loginButton">Log in</button>
                        <Link to={"/register"} className="linkRegister">Create a new Account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}