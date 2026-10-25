'use client';

import { Suspense, use } from 'react';
import { SignupForm } from '@/features/auth/components/signup-form';
import { safeRedirectPath } from '@/features/auth/lib/credentials';

function SignupPageContent({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>;
}) {
  const params = use(searchParams);
  const redirectValue = Array.isArray(params.redirect)
    ? params.redirect[0]
    : params.redirect;

  return <SignupForm redirectTo={safeRedirectPath(redirectValue)} />;
}

export default function SignupPage({
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
      <SignupPageContent searchParams={searchParams} />
    </Suspense>
  );
}
