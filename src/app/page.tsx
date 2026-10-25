'use client';

import { CategorySpotlight } from '@/features/hobby/components/category-spotlight';
import { HeroSection } from '@/features/hobby/components/hero-section';
import { HomeContent } from '@/features/hobby/components/home-content';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySpotlight />
      <HomeContent />
    </>
  );
}
