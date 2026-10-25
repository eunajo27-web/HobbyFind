'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { match } from 'ts-pattern';
import type { Category } from '@/constants/categories';
import { getHobbiesByCategory } from '@/constants/hobbies';
import { HobbyCardGrid } from '@/features/hobby/components/hobby-card-grid';
import {
  fadeEase,
  keepOpacityOnMainThread,
} from '@/features/hobby/lib/motion';

export function CategoryPageContent({ category }: { category: Category }) {
  const hobbies = getHobbiesByCategory(category.type);
  const cover = hobbies[0];
  const overlay = match(category.type)
    .with('sports', () => 'from-rose-950/85 via-rose-950/45')
    .with('intelligence', () => 'from-neutral-950/85 via-neutral-950/40')
    .with('art', () => 'from-stone-950/85 via-stone-950/35')
    .exhaustive();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
      <motion.section
        className="relative mt-8 overflow-hidden rounded-[2rem] border border-neutral-200 shadow-sm md:mt-10"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'tween', duration: 1.15, ease: fadeEase }}
        onUpdate={keepOpacityOnMainThread}
      >
        <img
          src={cover.imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${overlay} to-transparent`} />
        <div className="relative max-w-2xl px-6 py-14 text-white md:px-10 md:py-20">
          <p className="text-sm font-semibold tracking-[0.16em] text-rose-200">
            {category.label}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            {category.label} 취미를
            <br />
            한자리에 모았습니다
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {category.description}
          </p>
          <p className="mt-6 text-sm font-medium text-white/80">고정 취미 {hobbies.length}가지</p>
        </div>
      </motion.section>

      <motion.ul
        className="mt-6 flex gap-2 overflow-x-auto pb-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'tween', duration: 0.95, delay: 0.25, ease: fadeEase }}
        onUpdate={keepOpacityOnMainThread}
      >
        {hobbies.map((hobby) => (
          <li
            key={hobby.id}
            className="whitespace-nowrap rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700"
          >
            {hobby.name}
          </li>
        ))}
      </motion.ul>

      <div className="mt-6">
        <HobbyCardGrid hobbies={hobbies} />
      </div>

      <p className="mt-10 text-center text-sm text-neutral-500">
        다른 결도 보고 싶다면{' '}
        <Link href="/" className="font-semibold text-neutral-900 underline-offset-4 hover:underline">
          전체 취미
        </Link>
        로 돌아가 보세요.
      </p>
    </div>
  );
}
