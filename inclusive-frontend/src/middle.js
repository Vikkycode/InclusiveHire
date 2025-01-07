import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.get('auth_token');
  const userRole = request.cookies.get('user_role');

  // Protected routes
  const protectedRoutes = ['/dashboard', '/employer/dashboard', '/admin/dashboard'];
  const adminRoutes = ['/admin/dashboard'];
  
  // Auth routes that shouldn't be accessed if logged in
  const authRoutes = ['/login', '/register'];

  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (adminRoutes.includes(pathname) && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/employer/dashboard', '/admin/dashboard', '/login', '/register']
};