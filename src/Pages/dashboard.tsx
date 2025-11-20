

import { useEffect, useState } from "react";
import axios from "axios";

interface Department {
  id: number;
  abbreviation: string;
  name: string;
  description: string;
  status: string;
}

export default function Dashboard() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [form, setForm] = useState({ abbreviation: "", name: "", description: "", status: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const fullname = typeof window !== "undefined" ? localStorage.getItem("fullname") : null;

  const api = axios.create({
    baseURL: "/api", // 🔥 FIX for Vercel & CORS — no need full URL
    headers: { "Content-Type": "application/json" },
  });

  // Fetch departments
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/departments");
      setDepartments(res.data.data || []); // 👈 IMPORTANT FIX
    } catch (error) {
      alert("Error loading departments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Form change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async () => {
  if (!form.abbreviation || !form.name || !form.description || !form.status) {
    return alert("Please fill in all fields.");
  }

  try {
    if (editingId !== null && editingId > 0) {
  await api.put(`/departments/${editingId}`, form);
} else {
  await api.post("/departments", form);
}


    setForm({ abbreviation: "", name: "", description: "", status: "" });
    setEditingId(null); // reset edit mode
    fetchDepartments(); // refresh list
  } catch (error) {
    alert("Error submitting form.");
  }
};


 const handleEdit = (department: Department) => {
   console.log("Editing department:", department); // 👀 Check ID here!
  setForm({
    abbreviation: department.abbreviation,
    name: department.name,
    description: department.description,
    status: department.status,
  });
  setEditingId(department.id); // 🔥 make sure this is number & not undefined
};


  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this department?")) {
      try {
        await api.delete(`/departments/${id}`);
        fetchDepartments();
      } catch {
        alert("Error deleting department.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("fullname");
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Welcome, {fullname}</h1>
      <button onClick={handleLogout}>Logout</button>

      <h2>{editingId ? "Edit Department" : "Add Department"}</h2>
      <input name="abbreviation" value={form.abbreviation} onChange={handleChange} placeholder="Abbreviation" />
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <input name="status" value={form.status} onChange={handleChange} placeholder="Status" />
      <button onClick={handleSubmit}>
  {editingId !== null ? "Update" : "Add"}
</button>


      <h2>Departments</h2>
      {loading ? <p>Loading...</p> : departments.length === 0 ? <p>No departments found.</p> : null}

      <table>
        <thead>
          <tr>
            <th>Abbreviation</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.abbreviation}</td>
              <td>{dept.name}</td>
              <td>{dept.description}</td>
              <td>{dept.status}</td>
              <td>
                <button onClick={() => handleEdit(dept)}>Edit</button>
                <button onClick={() => handleDelete(dept.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
