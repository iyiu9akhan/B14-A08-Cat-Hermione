import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 1. Get authorization header from the request
  const authHeader = request.headers.get("authorization");

  // 2. Extract JWT token value
  const jwtToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  // 3. LOG TO BACKEND/SERVER CONSOLE 👇
  // Run: `npm run dev` and check your terminal/console
  console.log("========================================");
  console.log("🔔 BACKEND CONSOLE - JWT Token Received");
  console.log("========================================");
  console.log("🔐 Authorization Header:", authHeader);
  console.log("𔥔 Extracted JWT Token:", jwtToken ? jwtToken.substring(0, 30) + "..." : "no token provided");
  console.log("🔐 Token length:", jwtToken?.length ?? 0);
  console.log("========================================\n");

  // 4. Optional: Verify token with better-auth
  // const session = await auth.api.getSession({
  //   headers: new Headers({ authorization: authHeader })
  // });
  // console.log("🔐 Verified user:", session?.user?.email);

  return NextResponse.json({
    success: true,
    message: "JWT token received in backend console ✅",
    tokenPreview: jwtToken ? jwtToken.substring(0, 20) + "..." : "none",
    hasToken: !!jwtToken
  });
}