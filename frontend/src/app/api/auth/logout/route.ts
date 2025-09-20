// app/api/auth/logout/route.ts
import {
    NextRequest,
    NextResponse
} from 'next/server';
import {
    destroySession
} from '@/lib/auth';

export async function POST(request: NextRequest) {
    await destroySession();
    return NextResponse.json({
        success: true
    });
}