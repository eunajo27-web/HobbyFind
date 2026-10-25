'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/constants/categories';
import { getHobbiesByCategory } from '@/constants/hobbies';
import {
  fadeEase,
  keepOpacityOnMainThread,
} from '@/features/hobby/lib/motion';

export function CategorySpotlight() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 md:px-6">
      <motion.div
        className="mb-5 flex items-end justify-between gap-4"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'tween', duration: 1.05, delay: 0.45, ease: fadeEase }}
        onUpdate={keepOpacityOnMainThread}
      >
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">세 가지 결로 모아 보기</h2>
          <p className="mt-2 text-sm text-neutral-500 md:text-base">
            상단 메뉴와 같은 페이지로 이동합니다. 각 묶음에는 취미 6가지가 있습니다.
          </p>
        </div>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-3">
        {CATEGORIES.map((category, index) => {
          const hobbies = getHobbiesByCategory(category.type);
          const cover = hobbies[0];
          const secondary = hobbies[1];

          return (
            <motion.div
              key={category.type}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'tween',
                duration: 1.05,
                delay: 0.55 + index * 0.16,
                ease: fadeEase,
              }}
              onUpdate={keepOpacityOnMainThread}
            >
              <Link
                href={`/category/${category.type}`}
                className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-52 overflow-hidden bg-neutral-100">
                  <img
                    src={cover.imageUrl}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <img
                    src={secondary.imageUrl}
                    alt=""
                    className="absolute bottom-4 right-4 h-20 w-20 rounded-2xl border-2 border-white object-cover shadow-md"
                  />
                </div>
                <div className="flex items-end justify-between gap-3 p-5">
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-rose-500">
                      {category.label}
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-neutral-900">
                      {category.label} 취미 6가지
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                      {category.description}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition duration-500 group-hover:bg-rose-500">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
