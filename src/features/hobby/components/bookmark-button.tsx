'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

type BookmarkButtonProps = {
  hobbyName: string;
  bookmarked: boolean;
  pending?: boolean;
  onToggle: () => void;
};

export function BookmarkButton({
  hobbyName,
  bookmarked,
  pending = false,
  onToggle,
}: BookmarkButtonProps) {
  return (
    <button
      type="button"
      aria-label={bookmarked ? `${hobbyName} 북마크 해제` : `${hobbyName} 북마크`}
      aria-pressed={bookmarked}
      disabled={pending}
      onClick={onToggle}
      className="absolute right-3 top-3 rounded-full bg-white/80 p-2 transition duration-150 hover:scale-110 active:scale-95 disabled:cursor-wait disabled:opacity-70"
    >
      <Heart
        className={cn(
          'h-5 w-5 transition-colors',
          bookmarked
            ? 'fill-rose-500 text-rose-500'
            : 'fill-none text-neutral-600',
        )}
        strokeWidth={2}
      />
    </button>
  );
}
