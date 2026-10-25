'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BookmarkList } from '@/features/mypage/components/bookmark-list';
import { StatsChart } from '@/features/mypage/components/stats-chart';
import {
  fadeEase,
  keepOpacityOnMainThread,
} from '@/features/hobby/lib/motion';

export function MypageContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const username = session?.user?.name || '회원';

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login?redirect=/mypage');
    }
  }, [router, status]);

  if (status !== 'authenticated') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-sm text-neutral-500 md:px-6">
        마이페이지를 확인하고 있습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:py-14">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'tween', duration: 0.9, ease: fadeEase }}
        onUpdate={keepOpacityOnMainThread}
      >
        <p className="text-sm font-semibold text-rose-500">마이페이지</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          {username}님이 저장한 취미
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500 md:text-base">
          북마크한 취미를 모아 보고, 운동형·지능형·예술형 분포를 확인하세요.
          하트를 다시 누르면 목록에서 바로 빠집니다.
        </p>
      </motion.header>
      <div className="mt-10 grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <BookmarkList />
        <StatsChart />
      </div>
    </div>
  );
}
