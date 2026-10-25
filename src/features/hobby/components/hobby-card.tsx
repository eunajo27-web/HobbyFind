'use client';

import { getCategoryLabel, type Hobby } from '@/constants/hobbies';
import { BookmarkButton } from '@/features/hobby/components/bookmark-button';

type HobbyCardProps = {
  hobby: Hobby;
  bookmarked: boolean;
  pending?: boolean;
  onToggle: (hobbyId: string) => void;
};

export function HobbyCard({
  hobby,
  bookmarked,
  pending = false,
  onToggle,
}: HobbyCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1.5 hover:shadow-lg">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 sm:aspect-square">
        <img
          src={hobby.imageUrl}
          alt={hobby.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <BookmarkButton
          hobbyName={hobby.name}
          bookmarked={bookmarked}
          pending={pending}
          onToggle={() => onToggle(hobby.id)}
        />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
          {getCategoryLabel(hobby.category)}
        </span>
        <h3 className="mt-1 text-base font-bold text-neutral-900">{hobby.name}</h3>
      </div>
    </article>
  );
}
