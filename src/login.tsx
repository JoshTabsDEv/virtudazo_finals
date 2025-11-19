// import React, { useState } from "react";
// import './App.css';

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = async () => {
//     const response = await fetch("http://localhost:4000/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });
//     const data = await response.json();
//     setMessage(data.message);
//   };

//   return (
//     <div className="login">
//       <h2>Login Using ExpressJS and NodeJS</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br />
//       <button onClick={handleLogin}>Login</button>
//       <p>{message}</p>
//     </div>
//   );
// }


















//login.tsx
//semifinal - ref start




// import { useState } from "react";
// import "./App.css";
// import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";

// import axios from "axios";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   // === Regular login ===
//   const handleLogin = async () => {
//     const api = axios.create({
//       baseURL: "http://localhost:4000",
//       headers: { "Content-Type": "application/json" },
//     });

//     try {
//       const { data } = await api.post("/login", { username, password });

//       if (data.success) {
//         localStorage.setItem("fullname", data.fullname);
//         setMessage("Login successful!");
//         window.location.href = "/dashboard";
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setMessage("Server error");
//     }
//   };

//   // === Google login ===
//   const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
//     try {
//       if (!credentialResponse.credential) {
//         setMessage("No Google credentials found");
//         return;
//       }

//       const res = await axios.post("http://localhost:4000/google-login", {
//         token: credentialResponse.credential,
//       });

//       if (res.data.success) {
//         localStorage.setItem("fullname", res.data.fullname);
//         setMessage("Google login successful!");
//         window.location.href = "/dashboard";
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       console.error("Google login error:", err);
//       setMessage("Google login failed");
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId="1016616466017-03fsmris44cv89qnelaed641obt80dmh.apps.googleusercontent.com">
//       <div className="login">
//         <h2>Login Using React + TypeScript + Express + MySQL</h2>

//         {/* Regular login */}
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />





//         <br />
//         <button onClick={handleLogin}>Login</button>

//         <hr />

//         {/* Google login option */}
//         <h3>Or login with Google</h3>
//         <GoogleLogin
//           onSuccess={handleGoogleLogin}
//           onError={() => setMessage("Google login failed")}
//         />

//         <p>{message}</p>
//       </div>
//     </GoogleOAuthProvider>
//   );
// }




//login.tsx
//ref end















// import { useState } from "react";
// import "./App.css";
// import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";

// import axios from "axios";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");


//   const [type, setType] = useState<"admin" | "guest">("guest");
//   const [user, setUser] = useState<What | null>(null);




//   interface What {
//   name: string;
//   type: "admin" | "guest";
// }



//   // === Regular login ===
//   const handleLogin = async () => {
//     const api = axios.create({
//       baseURL: "http://localhost:4000",
//       headers: { "Content-Type": "application/json" },
//     });

//     try {
//       const { data } = await api.post("/login", { username, password });

//       if (data.success) {
//         localStorage.setItem("fullname", data.fullname);
//         setMessage("Login successful!");
//         window.location.href = "/dashboard";
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setMessage("Server error");
//     }
//   };






//   // === Google login ===
//   const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
//     try {
//       if (!credentialResponse.credential) {
//         setMessage("No Google credentials found");
//         return;
//       }

//       const res = await axios.post("http://localhost:4000/google-login", {
//         token: credentialResponse.credential,
//       });

//       if (res.data.success) {
//         localStorage.setItem("fullname", res.data.fullname);
//         setMessage("Google login successful!");
//         window.location.href = "/dashboard";
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       console.error("Google login error:", err);
//       setMessage("Google login failed");
//     }
//   };

// //   return (
// //     <GoogleOAuthProvider clientId="1016616466017-03fsmris44cv89qnelaed641obt80dmh.apps.googleusercontent.com">
// //       <div className="login">
// //         <h2>Login Using React + TypeScript + Express + MySQL</h2>


// //         {/* Regular login */}
// //         <input
// //           type="text"
// //           placeholder="Username"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //         />
// //         <br />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />
// // <br></br>

// //  <select
// //             value={type}
// //             onChange={(e) => setType(e.target.value as "admin" | "guest")}
// //           >

// //             <option value="admin">Admin</option>
// //             <option value="guest">Guest</option>
// //           </select>




// //         <br />
// //         <button onClick={handleLogin}>Login</button>

// //         <hr />

// //         {/* Google login option */}
// //         <h3>Or login with Google</h3>
// //         <GoogleLogin
// //           onSuccess={handleGoogleLogin}
// //           onError={() => setMessage("Google login failed")}
// //         />

// //         <p>{message}</p>
// //       </div>
// //     </GoogleOAuthProvider>
// //   );
// // }



//   return (

//         <GoogleOAuthProvider clientId="1016616466017-03fsmris44cv89qnelaed641obt80dmh.apps.googleusercontent.com">

//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       {!user ? (
//         <div>
//           <h2 style={{color: "yellow"}}>Login</h2>
//           <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//          <br />
//          <input
//            type="password"
//            placeholder="Password"
//            value={password}
//            onChange={(e) => setPassword(e.target.value)}
//          />
//           <br />
//           <br></br>
//           <select
//             value={type}
//             onChange={(e) => setType(e.target.value as "admin" | "guest")}
//           >

//             <option value="admin">Admin</option>
//             <option value="guest">Guest</option>
//           </select>
//           <br /><br></br>
//           <button onClick={handleLogin}>Login</button>
//         </div>

//       ) : user.type === "guest" ? (

//          <div>
//           <h2>Hello, {user.name} </h2>
//           <p>You are logged in as: {user.type}</p>
//           <h3 style={{ color: "white" }}>You are not allowed here</h3>

        
//         </div>
        
//       ) : null
//       }
//     </div>


//              {/* Google login option */}
//          <h3>Or login with Google</h3>
//          <GoogleLogin
//            onSuccess={handleGoogleLogin}
//            onError={() => setMessage("Google login failed")}
//          />
//          <p>{message}</p>
     
//        </GoogleOAuthProvider> 
//   );
// }











//kani



// import { useState } from "react";
// import "./App.css";
// import {
//   GoogleOAuthProvider,
//   GoogleLogin,
//   CredentialResponse,
// } from "@react-oauth/google";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate(); // <-- for navigation

//   // === Regular login ===
//   const handleLogin = async () => {
//     const api = axios.create({
//       baseURL: "http://localhost:4000",
//       headers: { "Content-Type": "application/json" },
//     });

//     try {
//       const { data } = await api.post("http://localhost:4000/login", { username, password });

//       if (data.success) {
//         localStorage.setItem("fullname", data.fullname);
//         setMessage("Login successful!");
//         window.location.href = "/dashboard";
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setMessage("Server error");
//     }
//   };

//   // === Google login ===
//   const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
//     try {
//       if (!credentialResponse.credential) {
//         setMessage("No Google credentials found");
//         return;
//       }

//       const res = await axios.post("http://localhost:4000/google-login", {
//         token: credentialResponse.credential,
//       });

//       if (res.data.success) {
//         localStorage.setItem("fullname", res.data.fullname);
//         setMessage("Google login successful!");
//         window.location.href = "/dashboard";
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       console.error("Google login error:", err);
//       setMessage("Google login failed");
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId="1016616466017-03fsmris44cv89qnelaed641obt80dmh.apps.googleusercontent.com">
//       <div className="login">
//         <h2>Login Using React + TypeScript + Express + MySQL</h2>

//         {/* Regular login */}
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br />

//         <button onClick={handleLogin}>Login</button>

        
//         <button
//           onClick={() => navigate("/register")}
//           style={{ marginLeft: "10px", backgroundColor: "green", color: "white" }}
//         >
//           Register
//         </button>

//         <hr />

//         {/* Google login option */}
//         <h3>Or login with Google</h3>
//         <GoogleLogin
//           onSuccess={handleGoogleLogin}
//           onError={() => setMessage("Google login failed")}
//         />

//         <p>{message}</p>
//       </div>
//     </GoogleOAuthProvider>
//   );
// }



//kani
















// import { useState } from "react";
// import "./App.css";
// import {
//   GoogleOAuthProvider,
//   GoogleLogin,
//   CredentialResponse,
// } from "@react-oauth/google";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // === Regular login ===
//   const handleLogin = async () => {
//     const api = axios.create({
//       baseURL: "http://localhost:4000",
//       headers: { "Content-Type": "application/json" },
//     });

//     try {
//       const { data } = await api.post("/login", { username, password });

//       if (data.success) {
//         // ✅ Save both fullname and role in localStorage
//         localStorage.setItem("fullname", data.fullname);
//         localStorage.setItem("role", data.role);

//         setMessage("Login successful!");

//         // ✅ Redirect based on role
//         if (data.role === "admin") {
//           window.location.href = "/dashboard";
//         } else {
//           window.location.href = "/guestdashboard";
//         }
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setMessage("Server error");
//     }
//   };

//   // === Google login ===
//   const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
//     try {
//       if (!credentialResponse.credential) {
//         setMessage("No Google credentials found");
//         return;
//       }

//       const res = await axios.post("http://localhost:4000/google-login", {
//         token: credentialResponse.credential,
//       });

//       if (res.data.success) {
//         // ✅ Save fullname and role from Google login too
//         localStorage.setItem("fullname", res.data.fullname);
//         localStorage.setItem("role", res.data.role);

//         setMessage("Google login successful!");

//         // ✅ Redirect based on role
//         if (res.data.role === "admin") {
//           window.location.href = "/dashboard";
//         } else {
//           window.location.href = "/guestdashboard";
//         }
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       console.error("Google login error:", err);
//       setMessage("Google login failed");
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId="1016616466017-03fsmris44cv89qnelaed641obt80dmh.apps.googleusercontent.com">
//       <div className="login">
//         <h2>Login Using React + TypeScript + Express + MySQL</h2>

//         {/* Regular login */}
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br />

//         <button onClick={handleLogin}>Login</button>

//         <button
//           onClick={() => navigate("/register")}
//           style={{
//             marginLeft: "10px",
//             backgroundColor: "green",
//             color: "white",
//           }}
//         >
//           Register
//         </button>

//         <hr />

//         {/* Google login option */}
//         <h3>Or login with Google</h3>
//         <GoogleLogin
//           onSuccess={handleGoogleLogin}
//           onError={() => setMessage("Google login failed")}
//         />

//         <p>{message}</p>
//       </div>
//     </GoogleOAuthProvider>
//   );
// }












// import { useState } from "react";
// import "./App.css";
// import {
//   GoogleOAuthProvider,
//   GoogleLogin,
//   CredentialResponse,
// } from "@react-oauth/google";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // === Manual login ===
//   const handleLogin = async () => {
//     try {
//       const { data } = await axios.post("http://localhost:4000/login", {
//         username,
//         password,
//       });

//       if (data.success) {
//         localStorage.setItem("fullname", data.fullname);
//         localStorage.setItem("role", data.role);
//         setMessage("Login successful!");

//         // ✅ Redirect based on role
//         if (data.role === "admin") {
//           window.location.href = "/dashboard";
//         } else {
//           window.location.href = "/guestdashboard";
//         }
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       setMessage("Server error");
//     }
//   };

//   // === Google login ===
//   const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
//     try {
//       if (!credentialResponse.credential) {
//         setMessage("No Google credentials found");
//         return;
//       }

//       const res = await axios.post("http://localhost:4000/google-login", {
//         token: credentialResponse.credential,
//       });

//       if (res.data.success) {
//         // ✅ Save fullname and role in localStorage
//         localStorage.setItem("fullname", res.data.fullname);
//         localStorage.setItem("role", res.data.role.toLowerCase());

//         setMessage("Google login successful!");

//         // ✅ Redirect based on actual DB role (this fixes your issue)
//         if (res.data.role.toLowerCase() === "admin") {
//           window.location.href = "/dashboard"; // admin dashboard
//         } else {
//           window.location.href = "/guestdashboard"; // student dashboard
//         }
//       } else {
//         setMessage(res.data.message);
//       }
//     } catch (err) {
//       console.error("Google login error:", err);
//       setMessage("Google login failed");
//     }
//   };

//   return (
//     <GoogleOAuthProvider clientId="1016616466017-03fsmris44cv89qnelaed641obt80dmh.apps.googleusercontent.com">
//       <div className="login">
//         <h2>Login Using React + TypeScript + Express + MySQL</h2>

//         {/* Manual login fields */}
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <br />

//         <button onClick={handleLogin}>Login</button>
//         <button
//           onClick={() => navigate("/register")}
//           style={{
//             marginLeft: "10px",
//             backgroundColor: "green",
//             color: "white",
//           }}
//         >
//           Register
//         </button>

//         <hr />

//         <h3>Or login with Google</h3>
//         <GoogleLogin
//           onSuccess={handleGoogleLogin}
//           onError={() => setMessage("Google login failed")}
//         />

//         <p>{message}</p>
//       </div>
//     </GoogleOAuthProvider>
//   );
// }











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
      const { data } = await axios.post("https://aranzado-finals.vercel.app/login", {
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

      const res = await axios.post("https://aranzado-finals.vercel.app/google-login", {
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
      {/*<div className="login">
        <h2>Login Using React + TypeScript + Express + MySQL</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br></br>
        <button onClick={handleLogin}>Login</button>
        <button
          onClick={() => navigate("/register")}
          style={{
            marginLeft: "10px",
            backgroundColor: "green",
            color: "white",
          }}
        >
          Register
        </button>

        <hr />

        <h3>Or login with Google</h3>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setMessage("Google login failed")}
        />

        <p>{message}</p>
      </div>*/}


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
  




