import { NextResponse } from "next/server";
import { verifyToken } from "../../lib/jwt";
import db from "../../lib/db";

export async function GET(req: Request) {
  const { decoded, error } = await verifyToken(req);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }

  try {
    const stmt = db.prepare("SELECT * FROM User WHERE id = ?");
    const user = stmt.get(decoded.id);

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 }); // Send the user data as JSON
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch user data." },
      { status: 500 }
    );
  }
}
