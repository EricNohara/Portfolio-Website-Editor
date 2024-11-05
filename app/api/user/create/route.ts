import db from "../../../lib/db";
import { NextResponse } from "next/server";
import { hashPassword } from "../../../lib/bcrypt";

export async function POST(req: Request) {
  try {
    const {
      name,
      phone_number,
      email,
      location,
      github_link,
      linkedin_link,
      password,
    } = await req.json();

    const hashedPassword: string = await hashPassword(password);

    // Initialize arrays to hold the columns and values
    const columns: string[] = ["name", "phone_number", "email", "password"];

    const values: (string | null)[] = [
      name,
      phone_number,
      email,
      hashedPassword,
    ];

    // Add optional fields if they are not empty
    if (location) {
      columns.push("location");
      values.push(location);
    }

    if (github_link) {
      columns.push("github_link");
      values.push(github_link);
    }

    if (linkedin_link) {
      columns.push("linkedin_link");
      values.push(linkedin_link);
    }

    // Create the SQL statement
    const placeholders = values.map(() => "?").join(", ");
    const sql = `INSERT INTO User (${columns.join(
      ", "
    )}) VALUES (${placeholders})`;

    const stmt = db.prepare(sql);

    stmt.run(...values);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
