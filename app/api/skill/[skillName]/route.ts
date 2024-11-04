import { NextResponse } from "next/server";
import { verifyToken } from "../../../lib/jwt";
import db from "../../../lib/db";

// DELETE route for deleting a certain skill for a given person
export async function DELETE(
  req: Request,
  { params }: { params: { skillName: string } }
) {
  const { decoded, error } = await verifyToken(req);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }

  const stmt = db.prepare(
    "DELETE FROM UserSkill WHERE name = ? AND user_id = ?"
  );

  const result = stmt.run(params.skillName, decoded.id);

  if (result.changes === 0) {
    return NextResponse.json(
      { message: `Error deleting user${decoded.id}'s skill` },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: `Skill deleted successfully for user ID ${decoded.id}` },
    { status: 200 }
  );
}

// UPDATE route for updating the value of a give skill
export async function PUT(
  req: Request,
  { params }: { params: { skillName: string } }
) {
  const { decoded, error } = await verifyToken(req);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }

  const { newSkill } = await req.json();
  const stmt = db.prepare(
    "UPDATE UserSkill SET skill = ? WHERE user_id = ? AND name = ?"
  );
  stmt.run(newSkill, decoded.id, params.skillName);

  return NextResponse.json(
    { message: "Skill updated successfully" },
    { status: 200 }
  );
}
