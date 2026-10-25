'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { Hobby } from '@/constants/hobbies';
import { useBookmarks } from '@/features/bookmark/hooks/use-bookmarks';
import { HobbyCard } from '@/features/hobby/components/hobby-card';
import { fadeEase, keepOpacityOnMainThread } from '@/features/hobby/lib/motion';

type HobbyCardGridProps = {
  hobbies: Hobby[];
  animateExit?: boolean;
  columns?: 'browse' | 'saved';
};

const columnClassName = {
  browse: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  saved: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
} as const;

export function HobbyCardGrid({
  hobbies,
  animateExit = false,
  columns = 'browse',
}: HobbyCardGridProps) {
  const { hobbyIds, pendingId, toggle } = useBookmarks();

  return (
    <div className={`grid gap-5 ${columnClassName[columns]}`}>
      <AnimatePresence mode="popLayout">
        {hobbies.map((hobby, index) => (
          <motion.div
            key={hobby.id}
            layout
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: 16,
              scale: 0.98,
              transition: { type: 'tween', duration: 0.4, delay: 0, ease: fadeEase },
            }}
            transition={{
              type: 'tween',
              duration: animateExit ? 0.7 : 0.95,
              delay: Math.min(index, 8) * (animateExit ? 0.05 : 0.08),
              ease: fadeEase,
            }}
            onUpdate={keepOpacityOnMainThread}
          >
            <HobbyCard
              hobby={hobby}
              bookmarked={hobbyIds.includes(hobby.id)}
              pending={pendingId === hobby.id}
              onToggle={toggle}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
