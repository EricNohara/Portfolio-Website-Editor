import { NextResponse } from "next/server";
import { verifyToken } from "../../lib/jwt";
import db from "../../lib/db";

export async function POST(req: Request) {
  const { decoded, error } = await verifyToken(req);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }

  const userID = decoded.id;
  const { skill } = await req.json();

  const stmt = db.prepare(
    "INSERT INTO UserSkill (name, user_id) VALUES (?, ?)"
  );

  const result = stmt.run(skill, userID);

  if (result.changes === 0) {
    return NextResponse.json(
      {
        message: "Skill not added: check if user ID or skill is valid",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: `Skill added successfully for user ID ${userID}` },
    { status: 200 }
  );
}
