import { NextResponse } from "next/server";
import { verifyToken } from "../../lib/jwt";
import db from "../../lib/db";
import { decode } from "punycode";

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

export async function DELETE(req: Request) {
  const { decoded, error } = await verifyToken(req);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }

  try {
    // Delete all foreign key references before deleting the user
    const delProjectStmt = db.prepare("DELETE FROM Project WHERE user_id = ?");
    delProjectStmt.run(decoded.id);

    const delProjLangStmt = db.prepare(
      "DELETE FROM ProjectLanguage WHERE user_id = ?"
    );
    delProjLangStmt.run(decoded.id);

    const delUserLang = db.prepare(
      "DELETE FROM UserLanguage WHERE user_id = ?"
    );
    delUserLang.run(decoded.id);

    const delUserSkill = db.prepare("DELETE FROM UserSkill WHERE user_id = ?");
    delUserSkill.run(decoded.id);

    const deleteUserStmt = db.prepare("DELETE FROM User WHERE id = ?");
    const result = deleteUserStmt.run(decoded.id);

    if (result.changes === 0) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully." },
      { status: 200 }
    ); // Send the user data as JSON
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch user data." },
      { status: 500 }
    );
  }
}
