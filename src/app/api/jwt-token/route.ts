import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const jwtToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (process.env.NODE_ENV !== "production") {
    console.log("========================================");
    console.log("🔔 BACKEND CONSOLE - JWT Token Received");
    console.log("========================================");
    console.log("🔐 Authorization Header:", authHeader ?? "none");
    console.log("𔥔 Full JWT Token:", jwtToken ?? "no token provided");
    console.log("🔐 Token length:", jwtToken?.length ?? 0);
    console.log("========================================\n");
  }

  return NextResponse.json({
    success: true,
    message: "JWT token received in backend console ✅",
    tokenPreview: jwtToken ? `${jwtToken.substring(0, 20)}...` : "none",
    hasToken: Boolean(jwtToken),
  });
}
