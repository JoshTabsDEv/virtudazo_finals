import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12808486',
  password: 'NWjg9wP4ac',
  database: 'sql12808486',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') return getDepartment(req, res);
  if (req.method === 'PUT') return updateDepartment(req, res);
  if (req.method === 'DELETE') return deleteDepartment(req, res);
  return res.status(405).json({ message: 'Method Not Allowed' });
}

// GET: Single Department
async function getDepartment(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  try {
    const [rows]: any = await db.query("SELECT * FROM department WHERE id = ?", [id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Department not found' });
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// PUT: Update Department
async function updateDepartment(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const { abbreviation, name, description, status } = req.body;

  try {
    const [result]: any = await db.query(
      "UPDATE department SET abbreviation = ?, name = ?, description = ?, status = ? WHERE id = ?",
      [abbreviation, name, description, status, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Department not found' });

    res.json({ success: true, message: 'Department updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

// DELETE: Remove Department
async function deleteDepartment(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  try {
    const [result]: any = await db.query("DELETE FROM department WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: 'Department not found' });

    res.json({ success: true, message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
