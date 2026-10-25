'use client';

import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      className="text-xl font-bold text-rose-500 transition active:scale-95"
    >
      HobbyFind
    </Link>
  );
}
