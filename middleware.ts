import { NextResponse } from "next/server";

export function middleware(request: Request) {
  console.log("middleware");
  console.log(`${request.method} ${request.url}`);

  const origin = request.headers.get("origin");
  console.log(origin);

  return NextResponse.next();
}
export const config = {
    matcher: "/api/:path*"
}