
// interface DashboardProps {
//   role: string;
// }

// export default function Dashboard({ role }: DashboardProps) {
//   const fullname = localStorage.getItem("fullname");

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl">Welcome, {fullname}</h1>
      

      
//         <div>
//           <h3 className="text-xl mt-4">User Profile</h3>
//           <p>Basic user info only.</p>
//         </div>
    

//       <button
//         onClick={logout}
//         className="bg-red-500 text-white px-4 py-2 mt-6 rounded"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }









// export default function Dashboard() {
//   const fullname = localStorage.getItem("fullname");
//   const role = localStorage.getItem("role"); // ✅ dynamically load role

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl">Welcome, {fullname || "User"}!</h1>
//       <h2 className="text-lg">Role: {role || "Unknown"}</h2>

//       <div>
//         <h3 className="text-xl mt-4">User Profile</h3>
//         <p>Basic user info only.</p>
//       </div>

//       <button
//         onClick={logout}
//         className="bg-red-500 text-white px-4 py-2 mt-6 rounded"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }











export default function GuestDashboard() {
  const fullname = localStorage.getItem("fullname");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl">Welcome, {fullname}</h1>
      <h2 className="text-lg">Role:{role}</h2>

      {role === "admin" ? (
        <div>
          <h3 className="text-xl mt-4">Admin Panel</h3>
          <p>Manage Departments and Users</p>
          {/* You can display your departments list here */}
        </div>
      ) : (
        <div>
          <h3 className="text-xl mt-4">User Profile</h3>
          <p>This is  Dashboard</p>
        </div>
      )}

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 mt-6 rounded"
      >
        Logout
      </button>
    </div>
  );
}









