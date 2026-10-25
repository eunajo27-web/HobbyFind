'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { CATEGORIES } from '@/constants/categories';

const GUIDE_LINKS = [
  { href: '/', label: '홈' },
  ...CATEGORIES.map((category) => ({
    href: `/category/${category.type}`,
    label: category.label,
  })),
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-semibold text-neutral-900">HobbyFind</p>
          <p className="mt-1">
            © {format(new Date(), 'yyyy')} HobbyFind. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap gap-4">
          {GUIDE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-neutral-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
