import axios from "axios";
import { useState } from "react";
import { HOST, PORT } from "../../globalVariables";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const { setUserId } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            <h2>Login / Register</h2>
            
            <input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;