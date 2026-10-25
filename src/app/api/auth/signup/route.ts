import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { DUPLICATE_USERNAME_MESSAGE, BOOKMARK_ERROR_MESSAGE } from '@/constants/messages';
import { toAuthEmail } from '@/features/auth/lib/credentials';
import { signupRequestSchema } from '@/features/auth/lib/schema';

function createAuthClient() {
  return createClient(
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
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = signupRequestSchema.safeParse(json);

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? '입력값을 확인해 주세요.';
    return NextResponse.json({ message }, { status: 400 });
  }

  const username = parsed.data.username.toLowerCase();
  const supabase = createAuthClient();

  const { data: taken, error: takenError } = await supabase.rpc(
    'is_username_taken',
    { p_username: username },
  );

  if (takenError) {
    console.error('username check failed', takenError.message);
    return NextResponse.json(
      { message: BOOKMARK_ERROR_MESSAGE },
      { status: 500 },
    );
  }

  if (taken) {
    return NextResponse.json(
      { message: DUPLICATE_USERNAME_MESSAGE },
      { status: 409 },
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email: toAuthEmail(username),
    password: parsed.data.password,
    options: {
      data: { username },
    },
  });

  if (error) {
    console.error('signup failed', error.message);
    if (/already|registered|exists/i.test(error.message)) {
      return NextResponse.json(
        { message: DUPLICATE_USERNAME_MESSAGE },
        { status: 409 },
      );
    }

    if (/password/i.test(error.message)) {
      return NextResponse.json(
        { message: '비밀번호는 8자 이상이어야 합니다.' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: BOOKMARK_ERROR_MESSAGE },
      { status: 500 },
    );
  }

  const identities = data.user?.identities ?? [];
  if (!data.user || identities.length === 0) {
    return NextResponse.json(
      { message: DUPLICATE_USERNAME_MESSAGE },
      { status: 409 },
    );
  }

  return NextResponse.json({ ok: true });
}
