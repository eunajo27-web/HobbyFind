const AUTH_EMAIL_DOMAIN = 'hobbyfind.local';

/** 아이디를 Supabase Auth 이메일 형식으로 바꿉니다. */
export function toAuthEmail(username: string) {
  return `${username.trim().toLowerCase()}@${AUTH_EMAIL_DOMAIN}`;
}

/** 로그인 후 이동할 내부 경로만 허용합니다. */
export function safeRedirectPath(value?: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return '/';
  }

  return value;
}
