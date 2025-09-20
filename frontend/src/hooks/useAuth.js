// src/hooks/useAuth.js
'use client';

import {
    useState,
    useEffect
} from 'react';
import {
    getClientSession,
    destroySession
} from '@/lib/auth';

export function useAuth() {
    const [session,
        setSession] = useState(null);
    const [loading,
        setLoading] = useState(true);

    useEffect(() => {
        async function fetchSession() {
            try {
                const sessionData = getClientSession();
                setSession(sessionData);
            } catch (error) {
                console.error('Auth error:', error);
                setSession(null);
            } finally {
                setLoading(false);
            }
        }

        fetchSession();
    }, []);

    const signOut = async () => {
        try {
            destroySession();
            setSession(null);
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return {
        session,
        loading,
        signOut
    };
}