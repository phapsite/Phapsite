import {
    NextResponse
} from 'next/server'
import type {
    NextRequest
} from 'next/server'
import {
    getServerSession
} from '@/lib/auth'

export async function middleware(request: NextRequest) {
    const {
        pathname
    } = request.nextUrl

    // Protected routes
    const protectedRoutes = ['/dashboard']
    const publicRoutes = ['/login',
        '/']

    // Check if current route is protected
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    )

    // Check if current route is public
    const isPublicRoute = publicRoutes.some(route =>
        pathname.startsWith(route)
    )

    if (isProtectedRoute) {
        const session = await getServerSession()

        if (!session) {
            // Redirect to login if no session
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if (isPublicRoute && pathname === '/login') {
        const session = await getServerSession()

        if (session) {
            // Redirect to dashboard if already logged in
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/'
    ]
}