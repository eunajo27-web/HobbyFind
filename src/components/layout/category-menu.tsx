'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/constants/categories';
import { cn } from '@/lib/utils';

export function CategoryMenu({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn('items-center gap-6 text-sm font-medium', className)}>
      {CATEGORIES.map((category) => {
        const href = `/category/${category.type}`;
        const isActive = pathname === href;

        return (
          <Link
            key={category.type}
            href={href}
            className={cn(
              'whitespace-nowrap rounded-full px-3 py-1.5 transition duration-300',
              isActive
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-700 hover:bg-neutral-100 hover:text-black',
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}
