import { NextResponse } from "next/server";
import { verifyToken } from "../../../lib/jwt";
import db from "../../../lib/db";

// DELETE route for deleting a certain skill for a given person
export async function DELETE(
  req: Request,
  { params }: { params: { skillName: string } }
) {
  const resolvedParams = await params;
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

  const result = stmt.run(resolvedParams.skillName, decoded.id);

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
  const resolvedParams = await params;
  const { decoded, error } = await verifyToken(req);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }

  try {
    const { skill } = await req.json();

    if (!skill) {
      return NextResponse.json(
        { message: "Skill is required." },
        { status: 400 } // Bad Request if skill is missing
      );
    }

    const stmt = db.prepare(
      "UPDATE UserSkill SET name = ? WHERE user_id = ? AND name = ?"
    );
    const result = stmt.run(skill, decoded.id, resolvedParams.skillName);

    if (result.changes === 0) {
      return NextResponse.json(
        { message: `No skill found with name "${resolvedParams.skillName}".` },
        { status: 404 } // Not Found
      );
    }

    return NextResponse.json(
      { message: "Skill updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to update skill." },
      { status: 500 } // Internal Server Error
    );
  }
}
