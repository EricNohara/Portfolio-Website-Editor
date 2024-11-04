import db from "../../lib/db";
import { NextResponse } from "next/server";
import { verifyPassword } from "../../lib/bcrypt";
import { generateToken } from "../../lib/jwt";
import UserSchema from "../../interfaces/UserSchema";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user: UserSchema | undefined = db
      .prepare("SELECT * FROM User WHERE email = ?")
      .get(email) as UserSchema | undefined;

    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken({ id: user.id, email: user.email });

    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error logging in" }, { status: 500 });
  }
}
