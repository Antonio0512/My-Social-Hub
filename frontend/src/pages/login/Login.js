import "./login.css"
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/autContext";
import {AuthErrorMessage} from "../../components/errorMessages/authErrorMessages";

export const Login = () => {
    const navigate = useNavigate();

    const {login} = useContext(AuthContext);

    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        "email": "",
        "password": ""
    });

    const {email, password} = formData;

    const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await login({email, password});
            navigate("/");
        } catch (error) {
            setError(error.response.data.detail);
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SocialHub</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on MySocialHub.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={e => onSubmit(e)}>
                        <input placeholder="Email"
                               className="loginInput"
                               type="email"
                               name="email"
                               value={email}
                               onChange={e => onChange(e)}
                               required
                               autoComplete="email"
                        />
                        <input placeholder="Password"
                               className="loginInput"
                               type="password"
                               name="password"
                               value={password}
                               onChange={e => onChange(e)}
                               required
                               autoComplete="text"
                        />

                        <AuthErrorMessage message={error}/>

                        <button className="loginButton">Log in</button>
                        <Link to={"/register"} className="linkRegister">Create a new Account</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}