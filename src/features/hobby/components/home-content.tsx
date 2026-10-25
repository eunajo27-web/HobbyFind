'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HOBBIES, filterHobbies, type HobbyFilter } from '@/constants/hobbies';
import { CategoryFilter } from '@/features/hobby/components/category-filter';
import { HobbyCardGrid } from '@/features/hobby/components/hobby-card-grid';
import {
  fadeEase,
  keepOpacityOnMainThread,
} from '@/features/hobby/lib/motion';

export function HomeContent() {
  const [filter, setFilter] = useState<HobbyFilter>('all');
  const hobbies = filterHobbies(HOBBIES, filter);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-6">
      <motion.div
        className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'tween', duration: 1.05, delay: 0.7, ease: fadeEase }}
        onUpdate={keepOpacityOnMainThread}
      >
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">오늘의 취미 카드</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-500 md:text-base">
            전체를 천천히 넘겨 보거나, 한 결만 골라 볼 수 있습니다. 하트는 로그인한
            뒤에 저장됩니다.
          </p>
        </div>
        <p className="text-sm font-medium text-neutral-500">{hobbies.length}가지</p>
      </motion.div>
      <CategoryFilter value={filter} onChange={setFilter} />
      <HobbyCardGrid hobbies={hobbies} />
    </section>
  );
}
