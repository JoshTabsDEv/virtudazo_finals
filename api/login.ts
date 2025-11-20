import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12808486',
  password: 'NWjg9wP4ac',
  database: 'sql12808486',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ success: false, message: 'All fields required' });

  try {
    const [rows]: any = await db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length === 0)
      return res.json({ success: false, message: 'Invalid username or password' });

    const user = rows[0];

    res.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        role: user.role,
      },
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
}
