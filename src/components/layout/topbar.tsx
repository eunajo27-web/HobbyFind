'use client';

import { AuthButtons } from '@/components/layout/auth-buttons';
import { CategoryMenu } from '@/components/layout/category-menu';
import { Logo } from '@/components/layout/logo';

export function Topbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Logo />
        <CategoryMenu className="hidden md:flex" />
        <AuthButtons />
      </div>
      <div className="scrollbar-hide mx-auto max-w-7xl overflow-x-auto px-4 pb-3 md:hidden">
        <CategoryMenu className="flex" />
      </div>
    </header>
  );
}
