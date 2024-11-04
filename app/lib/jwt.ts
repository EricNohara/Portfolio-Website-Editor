import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key-fallback";

function generateToken(user: { id: number; email: string }) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
}

async function verifyToken(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    return { decoded };
  } catch (err) {
    console.error(err);
    return { error: { status: 403, message: "Invalid token" } };
  }
}

export { generateToken, verifyToken };
