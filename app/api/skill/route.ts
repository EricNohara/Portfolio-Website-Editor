import { NextResponse } from "next/server";
import { verifyToken } from "../../lib/jwt";
import db from "../../lib/db";

// used to ADD a skill to a signed in user
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

// used to get ALL skills of a given user
export async function GET(req: Request) {
  const { decoded, error } = await verifyToken(req);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }

  const userID = decoded.id;

  try {
    const stmt = db.prepare("SELECT name FROM UserSkill WHERE user_id = ?");
    const skillsRes = stmt.all(userID) as { name: string }[];
    const skills = skillsRes.map((row: { name: string }) => row.name);

    if (skills.length === 0) {
      return NextResponse.json(
        { message: "No skills found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ skills }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching skills" },
      { status: 500 }
    );
  }
}
