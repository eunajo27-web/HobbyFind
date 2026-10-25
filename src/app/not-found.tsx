'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-neutral-900">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 text-neutral-500">
        주소가 정확한지 확인하거나 홈에서 취미를 다시 둘러보세요.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600"
      >
        홈으로 이동
      </Link>
    </div>
  );
}
