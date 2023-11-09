import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  console.log(request.method, request.url, JSON.stringify(Array.from(request.headers)));
}
 
export const config = {
  matcher: '/:any*',
}
