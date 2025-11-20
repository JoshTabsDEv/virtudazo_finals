import type { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  "1016616466017-03fsmris44cv89qnelaed641obt80dmh.apps.googleusercontent.com"
);

const db = mysql.createPool({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12808486',
  password: 'NWjg9wP4ac',
  database: 'sql12808486',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, message: "Token required" });
  }

  try {
    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "1016616466017-03fsmris44cv89qnelaed641obt80dmh.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    if (!payload)
      return res.status(400).json({ success: false, message: "Invalid Google token" });

    const { sub: google_id, email, name } = payload;

    // Check if user exists
    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE google_id = ?",
      [google_id]
    );

    let user;

    if (rows.length === 0) {
      // Insert new Google user with default role "student"
      await db.query(
        "INSERT INTO users (fullname, email, google_id, role) VALUES (?, ?, ?, ?)",
        [name, email, google_id, "student"]
      );

      user = {
        fullname: name,
        email,
        role: "student",
      };
    } else {
      user = rows[0];
    }

    return res.json({
      success: true,
      message: "Google login successful!",
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      google_id,
    });

  } catch (err) {
    console.error("Google login error:", err);
    return res.status(500).json({ success: false, message: "Google login failed" });
  }
}
