'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LOGIN_ERROR_MESSAGE } from '@/constants/messages';
import { AuthCard } from '@/features/auth/components/auth-card';
import { loginSchema, type LoginValues } from '@/features/auth/lib/schema';

const fieldClassName =
  'h-11 rounded-lg border-neutral-300 focus:ring-rose-500 focus-visible:ring-rose-500';

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [formError, setFormError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });
  const signupHref =
    redirectTo === '/'
      ? '/signup'
      : `/signup?redirect=${encodeURIComponent(redirectTo)}`;

  const onSubmit = async (values: LoginValues) => {
    setFormError('');
    const result = await signIn('credentials', {
      username: values.username.trim().toLowerCase(),
      password: values.password,
      redirect: false,
    });

    if (!result || result.error) {
      setFormError(LOGIN_ERROR_MESSAGE);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  return (
    <AuthCard
      title="로그인"
      description="아이디와 비밀번호로 HobbyFind에 들어오세요."
    >
      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <Label htmlFor="login-username">아이디</Label>
          <Input
            id="login-username"
            autoComplete="username"
            className={fieldClassName}
            {...register('username')}
          />
          {errors.username && (
            <p className="text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">비밀번호</Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            className={fieldClassName}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        {formError && (
          <p className="text-sm text-red-600" role="alert">
            {formError}
          </p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-lg bg-rose-500 text-white transition duration-150 hover:bg-rose-600 active:scale-95"
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-500">
        아직 계정이 없나요?{' '}
        <Link href={signupHref} className="font-semibold text-rose-500 hover:underline">
          회원가입
        </Link>
      </p>
    </AuthCard>
  );
}
