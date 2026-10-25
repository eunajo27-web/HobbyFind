'use client';

import Link from 'next/link';
import { HOBBIES } from '@/constants/hobbies';
import { BOOKMARK_ERROR_MESSAGE } from '@/constants/messages';
import { useBookmarks } from '@/features/bookmark/hooks/use-bookmarks';
import { HobbyCardGrid } from '@/features/hobby/components/hobby-card-grid';

export function BookmarkList() {
  const { hobbyIds, isLoading, isError } = useBookmarks();
  const hobbies = HOBBIES.filter((hobby) => hobbyIds.includes(hobby.id));

  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold text-neutral-900">북마크 목록</h2>
        {!isLoading && !isError && (
          <p className="text-sm font-medium text-neutral-500">
            {hobbies.length}개
          </p>
        )}
      </div>

      {isLoading && (
        <p className="mt-6 text-sm text-neutral-500">북마크를 불러오는 중입니다.</p>
      )}

      {isError && (
        <div
          className="mt-6 rounded-2xl border border-neutral-200 bg-white px-6 py-12 text-center shadow-sm"
          role="alert"
        >
          <p className="text-sm text-neutral-700">{BOOKMARK_ERROR_MESSAGE}</p>
        </div>
      )}

      {!isLoading && !isError && (
        <div className={hobbies.length > 0 ? 'mt-6' : undefined}>
          <HobbyCardGrid hobbies={hobbies} animateExit columns="saved" />
        </div>
      )}

      {!isLoading && !isError && hobbies.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
          <p className="text-lg font-semibold text-neutral-900">
            아직 북마크한 취미가 없습니다
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            마음에 드는 취미 카드의 하트를 눌러 저장해 보세요.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-150 hover:bg-rose-600 active:scale-95"
          >
            취미 둘러보기
          </Link>
        </div>
      )}
    </section>
  );
}
