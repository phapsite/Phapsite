// lib/auth.ts
import {
    cookies
} from 'next/headers';
import {
    NextRequest,
    NextResponse
} from 'next/server';

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface Session {
    user: User;
    expires: Date;
}

export async function getSession(): Promise < Session | null > {
    try {
        const cookieStore = cookies();
        const sessionToken = cookieStore.get('session-token')?.value;

        if (!sessionToken) {
            return null;
        }

        // Parse and validate token (in production, verify JWT)
        try {
            const sessionData = JSON.parse(sessionToken);
            if (new Date(sessionData.expires) < new Date()) {
                // Expired session
                cookies().delete('session-token');
                return null;
            }
            return sessionData;
        } catch {
            return null;
        }
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
}

export async function createSession(user: User, expires: Date): Promise < void > {
    try {
        const sessionStore = cookies();
        sessionStore.set('session-token', JSON.stringify({
            user, expires: expires.toISOString()
        }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: Math.floor((expires.getTime() - Date.now()) / 1000),
            path: '/'
        });
    } catch (error) {
        console.error('Error creating session:', error);
    }
}

export async function destroySession(): Promise < void > {
    try {
        cookies().delete('session-token');
    } catch (error) {
        console.error('Error destroying session:', error);
    }
}

// API route handler for login
export async function POST(request: NextRequest) {
    try {
        const {
            email,
            password
        } = await request.json();

        // Your auth logic here
        if (email && password) {
            const user: User = {
                id: 'user123',
                email,
                name: 'Test User'
            };

            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            await createSession(user, expires);

            return NextResponse.json({
                success: true, user
            });
        }

        return NextResponse.json({
            success: false, message: 'Invalid credentials'
        }, {
            status: 400
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            success: false, message: 'Server error'
        }, {
            status: 500
        });
    }
}