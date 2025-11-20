
import { useState } from "react";
import "./App.css";
import {
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // === Manual login ===
  const handleLogin = async () => {
    try {
      const { data } = await axios.post("https://virtudazo-finals.vercel.app/api/login", {
        username,
        password,
      });

      if (data.success) {
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("role", data.role);
        setMessage("Login successful!");

        if (data.role === "admin") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/guestdashboard";
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error");
    }
  };

  // === Google login ===
  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        setMessage("No Google credentials found");
        return;
      }

      const res = await axios.post("https://virtudazo-finals.vercel.app/api/google-login", {
        token: credentialResponse.credential,
      });

      if (res.data.success) {
        localStorage.setItem("fullname", res.data.fullname);
        localStorage.setItem("role", res.data.role.toLowerCase());

        setMessage("Google login successful!");

        if (res.data.role.toLowerCase() === "admin") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/guestdashboard";
        }
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error("Google login error:", err);
      setMessage("Google login failed");
    }
  };

  return (
    <GoogleOAuthProvider clientId="1016616466017-03fsmris44cv89qnelaed641obt80dmh.apps.googleusercontent.com">
    

        <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtext">Login to your account</p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <button className="register-btn" onClick={() => navigate("/register")}>
            Register
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setMessage("Google login failed")}
          />

          {message && <p className="message1">{message}</p>}
        </div>
      </div>





















    </GoogleOAuthProvider>
  );
}
  




