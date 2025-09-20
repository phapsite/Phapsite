// app/api/auth/login/route.ts
import {
    NextRequest,
    NextResponse
} from 'next/server';
import {
    POST as loginHandler
} from '@/lib/auth';

export const POST = loginHandler;