import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret-key-fallback";

function generateToken(user: { id: int; email: string }) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
}

function verifyToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded; // Store the decoded user in the request for later use
    next();
  });
}

export { generateToken, verifyToken };
