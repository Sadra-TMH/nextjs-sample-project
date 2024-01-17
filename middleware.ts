import { NextResponse } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://yourdomain.com"]
    : ["http://localhost:3000", "https://www.google.com"];

export function middleware(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  console.log("middleware");
  console.log(`${request.method} ${request.url}`);

  console.log(origin);

  return NextResponse.next();
}
export const config = {
  matcher: "/api/:path*",
};
