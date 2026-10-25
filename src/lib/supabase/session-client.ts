import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { JWT } from 'next-auth/jwt';

/** 로그인한 사용자 JWT로 RLS가 적용되는 Supabase 클라이언트를 만듭니다. */
export async function createSupabaseForToken(token: JWT | null) {
  if (!token?.sub || !token.accessToken || !token.refreshToken) {
    return null;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  );

  const { error } = await supabase.auth.setSession({
    access_token: token.accessToken,
    refresh_token: token.refreshToken,
  });

  if (error) {
    return null;
  }

  return { supabase, userId: token.sub };
}

export type SessionSupabase = {
  supabase: SupabaseClient;
  userId: string;
};
