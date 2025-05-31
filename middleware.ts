import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  try {
    // Create supabase server client
    const { supabase, response } = createClient(request);

    // Refresh session if expired
    const { data: { session }, error } = await supabase.auth.getSession();

    // Handle authentication for dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      if (!session) {
        // Redirect unauthenticated users to signin page
        return NextResponse.redirect(new URL('/signin', request.url));
      }

      // Check if signup is completed for authenticated users
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('signup_completed')
        .eq('id', session.user.id)
        .single();

      if (profileError || !profile?.signup_completed) {
        // Redirect users who haven't completed signup
        return NextResponse.redirect(new URL('/signin/signup', request.url));
      }
    }

    // Handle authentication for auth routes (signin, signup)
    if (
      session &&
      (request.nextUrl.pathname.startsWith('/signin') ||
        request.nextUrl.pathname.startsWith('/signup'))
    ) {
      // Redirect authenticated users to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};