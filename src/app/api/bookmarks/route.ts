import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isHobbyId } from '@/constants/hobbies';
import {
  AUTH_REQUIRED_MESSAGE,
  BOOKMARK_ERROR_MESSAGE,
} from '@/constants/messages';
import { createSupabaseForToken } from '@/lib/supabase/session-client';
import type { SupabaseClient } from '@supabase/supabase-js';

const toggleSchema = z.object({
  hobbyId: z.string().refine(isHobbyId, '존재하지 않는 취미입니다.'),
});

async function readBookmarkIds(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('hobby_id')
    .eq('user_id', userId);

  if (error) {
    return { hobbyIds: null, error };
  }

  return {
    hobbyIds: (data ?? []).map((row) => row.hobby_id as string),
    error: null,
  };
}

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const session = await createSupabaseForToken(token);

  if (!session) {
    return NextResponse.json({ message: AUTH_REQUIRED_MESSAGE }, { status: 401 });
  }

  const { hobbyIds, error } = await readBookmarkIds(
    session.supabase,
    session.userId,
  );

  if (error || !hobbyIds) {
    return NextResponse.json({ message: BOOKMARK_ERROR_MESSAGE }, { status: 500 });
  }

  return NextResponse.json({ hobbyIds });
}

export async function POST(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const session = await createSupabaseForToken(token);

  if (!session) {
    return NextResponse.json({ message: AUTH_REQUIRED_MESSAGE }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = toggleSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? '입력값을 확인해 주세요.' },
      { status: 400 },
    );
  }

  const { hobbyId } = parsed.data;
  const { data: existing, error: selectError } = await session.supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', session.userId)
    .eq('hobby_id', hobbyId)
    .maybeSingle();

  if (selectError) {
    return NextResponse.json({ message: BOOKMARK_ERROR_MESSAGE }, { status: 500 });
  }

  if (existing) {
    const { error } = await session.supabase
      .from('bookmarks')
      .delete()
      .eq('id', existing.id)
      .eq('user_id', session.userId);

    if (error) {
      return NextResponse.json({ message: BOOKMARK_ERROR_MESSAGE }, { status: 500 });
    }
  } else {
    const { error } = await session.supabase.from('bookmarks').insert({
      user_id: session.userId,
      hobby_id: hobbyId,
    });

    if (error) {
      return NextResponse.json({ message: BOOKMARK_ERROR_MESSAGE }, { status: 500 });
    }
  }

  const { hobbyIds, error } = await readBookmarkIds(
    session.supabase,
    session.userId,
  );

  if (error || !hobbyIds) {
    return NextResponse.json({ message: BOOKMARK_ERROR_MESSAGE }, { status: 500 });
  }

  return NextResponse.json({ hobbyIds });
}
