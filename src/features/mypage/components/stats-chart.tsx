'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { HOBBIES } from '@/constants/hobbies';
import { BOOKMARK_ERROR_MESSAGE } from '@/constants/messages';
import { useBookmarks } from '@/features/bookmark/hooks/use-bookmarks';
import { buildCategoryStats } from '@/features/mypage/lib/build-category-stats';

const BAR_COLORS = ['#FF385C', '#222222', '#717171'];

export function StatsChart() {
  const { hobbyIds, isLoading, isError } = useBookmarks();
  const bookmarkedHobbies = HOBBIES.filter((hobby) =>
    hobbyIds.includes(hobby.id),
  );
  const stats = buildCategoryStats(bookmarkedHobbies);
  const total = bookmarkedHobbies.length;

  return (
    <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm xl:sticky xl:top-24">
      <h2 className="text-lg font-bold text-neutral-900">카테고리별 통계</h2>
      <p className="mt-2 text-sm text-neutral-500">
        북마크 총{' '}
        <span className="font-semibold text-neutral-900">{isLoading ? '—' : total}</span>
        개
      </p>

      {isLoading && (
        <p className="mt-6 text-sm text-neutral-500">통계를 계산하는 중입니다.</p>
      )}

      {isError && (
        <p className="mt-6 text-sm text-neutral-700" role="alert">
          {BOOKMARK_ERROR_MESSAGE}
        </p>
      )}

      {!isLoading && !isError && total === 0 && (
        <div className="mt-6 rounded-xl bg-neutral-50 px-4 py-8 text-center">
          <p className="text-sm font-medium text-neutral-900">
            표시할 통계가 없습니다
          </p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            북마크가 생기면 카테고리별 비율이 여기에 나타납니다. 현재 분포는 0%입니다.
          </p>
          <ul className="mt-5 space-y-2 text-left">
            {stats.map((stat, index) => (
              <li
                key={stat.type}
                className="flex items-center justify-between text-sm text-neutral-700"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: BAR_COLORS[index] }}
                  />
                  {stat.label}
                </span>
                <span>0개 · 0%</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!isLoading && !isError && total > 0 && (
        <>
          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats} barSize={36}>
                <CartesianGrid stroke="#DDDDDD" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: '#222222', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: '#717171', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#F7F7F7' }}
                  formatter={(value, _name, item) => {
                    const ratio = item.payload?.ratio ?? 0;
                    return [`${value}개 (${ratio}%)`, '북마크'];
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {stats.map((stat, index) => (
                    <Cell key={stat.type} fill={BAR_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-4 space-y-2">
            {stats.map((stat, index) => (
              <li
                key={stat.type}
                className="flex items-center justify-between text-sm text-neutral-700"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: BAR_COLORS[index] }}
                  />
                  {stat.label}
                </span>
                <span>
                  {stat.count}개 · {stat.ratio}%
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}
