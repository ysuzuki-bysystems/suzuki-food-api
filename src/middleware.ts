import { NextResponse, type NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const endpoint = process.env["INTROSPECT_ENDPOINT"];
  const client_id = process.env["CLIENT_ID"];
  const client_secret = process.env["CLIENT_SECRET"];
  if (typeof endpoint === "undefined" || typeof client_id === "undefined" || typeof client_secret === "undefined") {
    throw new Error(`${endpoint?.length}, ${client_id?.length}, ${client_secret?.length}`);
  }

  const token = request.headers.get("authorization");
  if (token === null || !token.startsWith("Bearer ")) {
    return NextResponse.json({ "error": "bad request" }, { status: 400 });
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      token: token.slice("Bearer ".length),
      client_id,
      client_secret,
    }).toString(),
  });
  if (!response.ok) {
    console.warn(response.statusText, await response.text());
    return NextResponse.json({ "error": "bad request" }, { status: 400 });
  }

  const raw = await response.json();
  if (raw["active"] !== true) {
    return NextResponse.json({ "error": "bad request" }, { status: 400 });
  }
}
 
export const config = {
  matcher: '/:any*',
}
