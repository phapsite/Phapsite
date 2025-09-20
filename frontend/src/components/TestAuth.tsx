// components/TestAuth.tsx
'use client';

import { useAuth } from '@/lib/auth-context';

export default function TestAuth() {
  const { session, loading, signOut } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {session ? (
        <div>
          <h2>Welcome, {session.user.name}!</h2>
          <p>Email: {session.user.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
}