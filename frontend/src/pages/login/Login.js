import "./login.css"

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
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">Create a new Account?</button>
                    </div>
                </div>
            </div>
        </div>
    )
}