import axios from "axios";
import { useState } from "react";
import { HOST, PORT } from "../../globalVariables";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../../scss/base/button.scss";
import "../../scss/layouts/LoginPage.scss";
import "../../scss/base/input.scss";

const LoginPage = () => {
    const { setUserId } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [mode, setMode] = useState("register");

    const handleRegister = async () => {
        try {
            const res = await axios.post(`http://${HOST}:${PORT}/auth/register`, {
                username,
                email,
                password
            });
            setUserId(res.data.id);
            navigate("/inventory");
        } catch (err) {
            alert("Register failed");
        }
    };

    const handleLogin = async () => {
        try {
            const res = await axios.post(`http://${HOST}:${PORT}/auth/login`, {
                email,
                password
            });
            setUserId(res.data.id);
            navigate("/inventory");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="login-page">
            <div className="login-page-container">
                <h2>Login / Register</h2>
                
                {mode === "register" && (
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="input"
                    />
                )}

                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input"
                />

                <input
                    type={"password"}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input"
                />

                <button 
                    className={`btn ${mode === "register" ? "" : "btn--muted"}`} 
                    onClick={() => {
                        if (mode === "register") {
                            handleRegister();
                        } else {
                            setMode("register");
                        }
                    }}
                >
                    Register
                </button>
                <button 
                    className={`btn ${mode === "login" ? "" : "btn--muted"}`}
                    onClick={() => {
                        if (mode === "login") {
                            handleLogin();
                        } else {
                            setMode("login");
                        }
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;