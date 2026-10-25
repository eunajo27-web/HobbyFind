'use client';

import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

function SessionGuard() {
  const { data } = useSession();

  useEffect(() => {
    if (data?.error === 'RefreshAccessTokenError') {
      void signOut({ callbackUrl: '/login' });
    }
  }, [data?.error]);

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SessionGuard />
      {children}
    </SessionProvider>
  );
}
