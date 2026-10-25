'use client';

import { countBy } from 'es-toolkit';
import { CATEGORIES } from '@/constants/categories';
import type { Hobby } from '@/constants/hobbies';

export type CategoryStat = {
  type: string;
  label: string;
  count: number;
  ratio: number;
};

/** 북마크 취미의 카테고리별 개수와 비율을 계산합니다. */
export function buildCategoryStats(hobbies: Hobby[]): CategoryStat[] {
  const counts = countBy(hobbies, (hobby) => hobby.category);
  const total = hobbies.length;
  const rows = CATEGORIES.map((category) => ({
    type: category.type,
    label: category.label,
    count: counts[category.type] ?? 0,
    ratio: 0,
  }));

  if (total === 0) {
    return rows;
  }

  const rawRatios = rows.map((row) => (row.count / total) * 100);
  const floored = rawRatios.map((value) => Math.floor(value));
  let remainder = 100 - floored.reduce((sum, value) => sum + value, 0);
  const fractions = rawRatios
    .map((value, index) => ({
      index,
      fraction: value - Math.floor(value),
    }))
    .sort((left, right) => right.fraction - left.fraction);

  const ratios = fractions.reduce((current, item) => {
    if (remainder <= 0) {
      return current;
    }

    remainder -= 1;
    return current.map((value, index) =>
      index === item.index ? value + 1 : value,
    );
  }, floored);

  return rows.map((row, index) => ({
    ...row,
    ratio: ratios[index] ?? 0,
  }));
}
