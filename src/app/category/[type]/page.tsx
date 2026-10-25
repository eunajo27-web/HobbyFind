'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { getCategory } from '@/constants/categories';
import { CategoryPageContent } from '@/features/hobby/components/category-page-content';

export default function CategoryPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  const category = getCategory(type);

  if (!category) {
    notFound();
  }

  return <CategoryPageContent category={category} />;
}
