import { BOOKMARK_ERROR_MESSAGE } from '@/constants/messages';

type SignupInput = {
  username: string;
  password: string;
  agreedToTerms: true;
};

/** 아이디/비밀번호 회원가입을 요청합니다. 비밀번호는 서버에서 Supabase Auth로 해시됩니다. */
export async function signupAccount(input: SignupInput) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const payload = (await response.json().catch(() => null)) as {
    message?: string;
  } | null;

  return {
    ok: response.ok,
    message: payload?.message || BOOKMARK_ERROR_MESSAGE,
  };
}
