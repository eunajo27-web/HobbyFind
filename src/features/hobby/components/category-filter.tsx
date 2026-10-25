'use client';

import { CATEGORIES } from '@/constants/categories';
import type { HobbyFilter } from '@/constants/hobbies';
import { cn } from '@/lib/utils';

const FILTERS: { value: HobbyFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  ...CATEGORIES.map((category) => ({
    value: category.type,
    label: category.label,
  })),
];

type CategoryFilterProps = {
  value: HobbyFilter;
  onChange: (value: HobbyFilter) => void;
};

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div
      className="scrollbar-hide flex gap-3 overflow-x-auto py-4"
      role="tablist"
      aria-label="취미 카테고리 필터"
    >
      {FILTERS.map((filter) => {
        const isActive = value === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter.value)}
            className={cn(
              'whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-150 active:scale-95',
              isActive
                ? 'border-black bg-black text-white'
                : 'border-neutral-300 bg-white text-neutral-700 hover:border-black',
            )}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
