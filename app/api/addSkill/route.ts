import { NextResponse } from "next/server";
import { verifyToken } from "../../lib/jwt";

export async function POST(req: Request) {
  const { decoded, error } = await verifyToken(req);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }

  const userID = decoded.id;
  return NextResponse.json(
    { message: `Authorized for adding skills to user ID ${userID}` },
    { status: 200 }
  );
}
