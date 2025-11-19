import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    // email: "",
    roleni: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  //old
  
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:4000/register", form);
  //     setMessage(res.data.message);
  //     if (res.data.success) setTimeout(() => navigate("/"), 1000);
  //   } catch (err) {
  //     console.error(err);
  //     setMessage("Registration failed. Try again.");
  //   }
  // };

  //old

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://https://aranzado-finals.vercel.app/register", form);

    setMessage(res.data.message);

    if (res.data.success) {
      // If registration successful, navigate to login
      setTimeout(() => navigate("/"), 1000);
    } else {
      // If username already exists or any failure, clear relevant fields
      setForm({
        ...form,
        fullname: "",
        username: "",
        password: "",
      });
    }
  } catch (err) {
    console.error(err);
    setMessage("Registration failed. Try again.");
    // Optionally clear fields on server error too
    
  }
};



//old


  // return (
  //   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //     <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
  //       <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Guest Register</h2>
  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         <div>
  //           <label className="block text-sm font-medium text-gray-600 mb-1">
  //             Full Name
  //           </label>
  //           <input
  //             type="text"
  //             name="fullname"
  //             value={form.fullname}
  //             onChange={handleChange}
  //             required
  //             className="w-full border border-gray-300 rounded-lg px-3 py-2"
  //           />
  //         </div>

  //         <div>
  //           <label className="block text-sm font-medium text-gray-600 mb-1">
  //             Username
  //           </label>
  //           <input
  //             type="text"
  //             name="username"
  //             value={form.username}
  //             onChange={handleChange}
  //             required
  //             className="w-full border border-gray-300 rounded-lg px-3 py-2"
  //           />
  //         </div>



  //       {/* <div>
  //           <label className="block text-sm font-medium text-gray-600 mb-1">
  //             Role
  //           </label>
  //           <input
  //             type="password"
  //             name="password"
  //             value={form.roleni}
  //             onChange={handleChange}
  //             required
  //             className="w-full border border-gray-300 rounded-lg px-3 py-2"
  //           />
  //         </div> */}

  //         <div>
  //           <label className="block text-sm font-medium text-gray-600 mb-1">
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             name="password"
  //             value={form.password}
  //             onChange={handleChange}
  //             required
  //             className="w-full border border-gray-300 rounded-lg px-3 py-2"
  //           />
  //         </div>


  //         <button
  //           type="submit"
  //           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
  //         >
  //           Register
  //         </button>
  //       </form>

  //       {message && (
  //         <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
  //       )}

  //       <p className="text-center text-sm text-gray-600 mt-4">
  //         Already have an account?{" "}
  //         <Link to="/" className="text-blue-600 hover:underline">
  //           Login here
  //         </Link>
  //       </p>
  //     </div>
  //   </div>
  // );

//old

return (
   <div className="register-page">
      <div className="register-card">
        <h2>Guest Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="register-label">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              className="register-input"
              required
            />
          </div>

          <div>
            <label className="register-label">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="register-input"
              required
            />
          </div>

          <div>
            <label className="register-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="register-input"
              required
            />
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        {message && <p className="message2">{message}</p>}

        <p className="footer">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );

}



  {/* <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div> */}