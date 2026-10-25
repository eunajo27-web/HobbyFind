'use client';

import { motion } from 'framer-motion';
import {
  fadeEase,
  keepOpacityOnMainThread,
} from '@/features/hobby/lib/motion';

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'tween' as const, duration: 1.15, delay, ease: fadeEase },
  }),
};

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(255,56,92,0.18),transparent_62%)]" />
      <motion.div
        className="relative mx-auto max-w-4xl px-4 pb-6 pt-16 text-center md:px-6 md:pt-24"
        initial="hidden"
        animate="show"
      >
        <motion.p
          className="text-sm font-semibold tracking-[0.18em] text-rose-500"
          custom={0.05}
          variants={heroItem}
          onUpdate={keepOpacityOnMainThread}
        >
          매일의 빈칸을 채우는 취미
        </motion.p>
        <motion.h1
          className="mt-4 text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-6xl"
          custom={0.18}
          variants={heroItem}
          onUpdate={keepOpacityOnMainThread}
        >
          나만의 일상을 채워줄
          <br />
          새로운 취미를 발견하세요
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg"
          custom={0.36}
          variants={heroItem}
          onUpdate={keepOpacityOnMainThread}
        >
          운동형, 지능형, 예술형. 부담 없이 둘러보고, 마음에 남는 것만 하트로
          남겨 두세요. 취미는 18가지로 고정되어 있어 고르기가 가볍습니다.
        </motion.p>
      </motion.div>
    </section>
  );
}
