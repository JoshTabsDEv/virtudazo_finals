import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12808486',
  password: 'NWjg9wP4ac',
  database: 'sql12808486',
});
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return getDepartments(res);
  if (req.method === 'POST') return createDepartment(req, res);
  return res.status(405).json({ message: 'Method Not Allowed' });
}

// GET: All Departments
async function getDepartments(res: VercelResponse) {
  try {
    const [rows] = await db.query("SELECT * FROM department");
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// POST: Create Department
async function createDepartment(req: VercelRequest, res: VercelResponse) {
  const { abbreviation, name, description, status } = req.body;

  if (!abbreviation || !name || !description || !status)
    return res.status(400).json({ success: false, message: 'All fields are required' });

  try {
    await db.query(
      "INSERT INTO department (abbreviation, name, description, status) VALUES (?, ?, ?, ?)",
      [abbreviation, name, description, status]
    );
    res.status(201).json({ success: true, message: 'Department added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
