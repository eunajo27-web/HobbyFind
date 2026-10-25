'use client';

import { Suspense, use } from 'react';
import { LoginForm } from '@/features/auth/components/login-form';
import { safeRedirectPath } from '@/features/auth/lib/credentials';

function LoginPageContent({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>;
}) {
  const params = use(searchParams);
  const redirectValue = Array.isArray(params.redirect)
    ? params.redirect[0]
    : params.redirect;

  return <LoginForm redirectTo={safeRedirectPath(redirectValue)} />;
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto my-20 h-96 max-w-md rounded-2xl bg-white" />
      }
    >
      <LoginPageContent searchParams={searchParams} />
    </Suspense>
  );
}
