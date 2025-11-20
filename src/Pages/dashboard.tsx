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
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const fullname = typeof window !== "undefined" ? localStorage.getItem("fullname") : null;

  const api = axios.create({
    baseURL: "/api",
    headers: { "Content-Type": "application/json" },
  });

  // Fetch departments
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/departments");
      setDepartments(res.data.data || []);
    } catch (error) {
      showMessage("Error loading projects.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  // Form change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async () => {
    if (!form.abbreviation || !form.name || !form.description || !form.status) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    setSubmitting(true);
    try {
      if (editingId !== null && editingId > 0) {
        await api.put(`/departments/${editingId}`, form);
        showMessage("Project updated successfully!", "success");
      } else {
        await api.post("/departments", form);
        showMessage("Project added successfully!", "success");
      }

      setForm({ abbreviation: "", name: "", description: "", status: "" });
      setEditingId(null);
      fetchDepartments();
    } catch (error: any) {
      showMessage(error.response?.data?.message || "Error submitting project.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (department: Department) => {
    setForm({
      abbreviation: department.abbreviation,
      name: department.name,
      description: department.description,
      status: department.status,
    });
    setEditingId(department.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm({ abbreviation: "", name: "", description: "", status: "" });
    setEditingId(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      try {
        await api.delete(`/departments/${id}`);
        showMessage("Project deleted successfully!", "success");
        fetchDepartments();
      } catch (error: any) {
        showMessage(error.response?.data?.message || "Error deleting project.", "error");
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("fullname");
      localStorage.removeItem("role");
      window.location.href = "/";
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div>
              <h1 className="dashboard-title">Project Management</h1>
              <p className="dashboard-subtitle">Welcome back, {fullname || "User"}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Message Alert */}
        {message && (
          <div className={`dashboard-alert ${message.type}`}>
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="alert-close">×</button>
          </div>
        )}

        {/* Form Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>{editingId ? "Edit Project" : "Add New Project"}</h2>
            {editingId && (
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel Edit
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="abbreviation">Project Code *</label>
              <input
                id="abbreviation"
                name="abbreviation"
                type="text"
                value={form.abbreviation}
                onChange={handleChange}
                placeholder="e.g., PROJ-001, WEB-2024"
                maxLength={10}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Project Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Project Name"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="description">Project Description *</label>
              <input
                id="description"
                name="description"
                type="text"
                value={form.description}
                onChange={handleChange}
                placeholder="Project description and details"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <span className="button-loading">
                <span className="spinner"></span>
                {editingId ? "Updating..." : "Adding..."}
              </span>
            ) : (
              editingId ? "Update Project" : "Add Project"
            )}
          </button>
        </div>

        {/* Departments Table Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Projects</h2>
            <span className="department-count">{departments.length} {departments.length === 1 ? "project" : "projects"}</span>
          </div>

          {loading ? (
            <div className="loading-state">
              <span className="spinner"></span>
              <p>Loading projects...</p>
            </div>
          ) : departments.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <p>No projects found</p>
              <span>Add a new project to get started</span>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="departments-table">
                <thead>
                  <tr>
                    <th>Project Code</th>
                    <th>Project Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept.id}>
                      <td>
                        <span className="abbreviation-badge">{dept.abbreviation}</span>
                      </td>
                      <td className="name-cell">{dept.name}</td>
                      <td className="description-cell">{dept.description}</td>
                      <td>
                        <span className={`status-badge status-${dept.status.toLowerCase()}`}>
                          {dept.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn edit-btn" 
                            onClick={() => handleEdit(dept)}
                            title="Edit project"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            Edit
                          </button>
                          <button 
                            className="action-btn delete-btn" 
                            onClick={() => handleDelete(dept.id)}
                            title="Delete project"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
