import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('accessToken');
  const userRole = request.cookies.get('userRole');

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
  
  // Role-specific paths
  const adminPaths = ['/admin'];
  const employerPaths = ['/employer'];
  const jobseekerPaths = ['/jobs'];

  // Check if path is public
  if (publicPaths.includes(pathname)) {
    if (token) {
      // If user is logged in, redirect to appropriate dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based access control
  if (adminPaths.some(path => pathname.startsWith(path)) && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (employerPaths.some(path => pathname.startsWith(path)) && userRole !== 'EMPLOYER') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (jobseekerPaths.some(path => pathname.startsWith(path)) && userRole !== 'JOBSEEKER') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};