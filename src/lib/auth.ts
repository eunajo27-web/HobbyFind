import { createClient } from '@supabase/supabase-js';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { toAuthEmail } from '@/features/auth/lib/credentials';

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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: '아이디', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        const username = credentials?.username?.trim().toLowerCase();
        const password = credentials?.password;

        if (!username || !password) {
          return null;
        }

        const supabase = createAuthClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email: toAuthEmail(username),
          password,
        });

        if (error || !data.user || !data.session) {
          return null;
        }

        const storedName = data.user.user_metadata?.username;
        const name = typeof storedName === 'string' ? storedName : username;

        return {
          id: data.user.id,
          name,
          email: data.user.email,
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          expiresAt: (data.session.expires_at ?? 0) * 1000,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = user.expiresAt;
        token.error = undefined;
        return token;
      }

      const expiresAt = token.expiresAt ?? 0;
      if (Date.now() < expiresAt - 60_000) {
        return token;
      }

      if (!token.refreshToken) {
        return { ...token, error: 'RefreshAccessTokenError' };
      }

      const supabase = createAuthClient();
      const { data, error } = await supabase.auth.refreshSession({
        refresh_token: token.refreshToken,
      });

      if (error || !data.session) {
        return { ...token, error: 'RefreshAccessTokenError' };
      }

      token.accessToken = data.session.access_token;
      token.refreshToken = data.session.refresh_token;
      token.expiresAt = (data.session.expires_at ?? 0) * 1000;
      token.error = undefined;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub ?? '';
      session.user.name = token.name;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
