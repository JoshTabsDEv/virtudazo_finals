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
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error">("error");
  const navigate = useNavigate();

  // === Manual login ===
  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");
    
    try {
      const { data } = await axios.post("/api/login", {
        username,
        password,
      });

      if (data.success) {
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("role", data.role);
        setMessage("Login successful! Redirecting...");
        setMessageType("success");

        setTimeout(() => {
          if (data.role === "admin") {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/guestdashboard";
          }
        }, 1000);
      } else {
        setMessage(data.message || "Invalid credentials");
        setMessageType("error");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || "Server error. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // === Google login ===
  const handleGoogleLogin = async (credentialResponse: any) => {
    setIsLoading(true);
    setMessage("");
    
    try {
      if (!credentialResponse.credential) {
        setMessage("No Google credentials found");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      const res = await axios.post("/api/google-login", {
        token: credentialResponse.credential,
      });

      if (res.data.success) {
        localStorage.setItem("fullname", res.data.fullname);
        localStorage.setItem("role", res.data.role.toLowerCase());

        setMessage("Google login successful! Redirecting...");
        setMessageType("success");

        setTimeout(() => {
          if (res.data.role.toLowerCase() === "admin") {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/guestdashboard";
          }
        }, 1000);
      } else {
        setMessage(res.data.message || "Google login failed");
        setMessageType("error");
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      setMessage(err.response?.data?.message || "Google login failed");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <GoogleOAuthProvider clientId="1016616466017-03fsmris44cv89qnelaed641obt80dmh.apps.googleusercontent.com">
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1>Welcome Back</h1>
              <p className="login-subtitle">Sign in to continue to your account</p>
            </div>

            <div className="login-form">
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className={message && messageType === "error" && !username ? "input-error" : ""}
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className={message && messageType === "error" && !password ? "input-error" : ""}
                />
              </div>

              {message && (
                <div className={`message-alert ${messageType}`}>
                  <span>{message}</span>
                </div>
              )}

              <button 
                className="login-btn-primary" 
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="button-loading">
                    <span className="spinner"></span>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

              <button 
                className="register-btn-secondary" 
                onClick={() => navigate("/register")}
                disabled={isLoading}
              >
                Create New Account
              </button>

              <div className="divider">
                <span>OR</span>
              </div>

              <div className="google-login-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    setMessage("Google login failed");
                    setMessageType("error");
                  }}
                  useOneTap
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
