'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { match } from 'ts-pattern';
import { cn } from '@/lib/utils';

export function AuthButtons() {
  const { status } = useSession();
  const pathname = usePathname();
  const onMypage = pathname === '/mypage';

  return match(status)
    .with('loading', () => <div className="h-9 w-36" aria-hidden="true" />)
    .with('authenticated', () => (
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/mypage"
          aria-current={onMypage ? 'page' : undefined}
          className={cn(
            'rounded-full px-3 py-2 text-sm font-medium transition duration-150 active:scale-95 sm:px-4',
            onMypage
              ? 'bg-neutral-900 text-white'
              : 'hover:bg-neutral-100',
          )}
        >
          마이페이지
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="rounded-full px-3 py-2 text-sm font-medium transition hover:bg-neutral-100 active:scale-95 sm:px-4"
        >
          로그아웃
        </button>
      </div>
    ))
    .with('unauthenticated', () => (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/login"
          className="rounded-full px-3 py-2 text-sm font-medium transition hover:bg-neutral-100 active:scale-95 sm:px-4"
        >
          로그인
        </Link>
        <Link
          href="/signup"
          className="rounded-full bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 active:scale-95 sm:px-4"
        >
          회원가입
        </Link>
      </div>
    ))
    .exhaustive();
}
