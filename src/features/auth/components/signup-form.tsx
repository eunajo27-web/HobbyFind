'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signupAccount } from '@/features/auth/api';
import { AuthCard } from '@/features/auth/components/auth-card';
import { signupSchema, type SignupValues } from '@/features/auth/lib/schema';

const fieldClassName =
  'h-11 rounded-lg border-neutral-300 focus:ring-rose-500 focus-visible:ring-rose-500';

export function SignupForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [formError, setFormError] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      agreedToTerms: false,
    },
  });
  const agreedToTerms = watch('agreedToTerms');
  const loginHref =
    redirectTo === '/'
      ? '/login'
      : `/login?redirect=${encodeURIComponent(redirectTo)}`;

  const onSubmit = async (values: SignupValues) => {
    setFormError('');
    const result = await signupAccount({
      username: values.username.trim().toLowerCase(),
      password: values.password,
      agreedToTerms: true,
    });

    if (!result.ok) {
      setFormError(result.message);
      return;
    }

    router.push(loginHref);
  };

  return (
    <AuthCard
      title="회원가입"
      description="아이디와 비밀번호만 사용합니다. 비밀번호는 Supabase Auth가 해시로 저장합니다."
    >
      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-2">
          <Label htmlFor="signup-username">아이디</Label>
          <Input
            id="signup-username"
            autoComplete="username"
            className={fieldClassName}
            {...register('username')}
          />
          {errors.username && (
            <p className="text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">비밀번호</Label>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            className={fieldClassName}
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password-confirm">비밀번호 확인</Label>
          <Input
            id="signup-password-confirm"
            type="password"
            autoComplete="new-password"
            className={fieldClassName}
            {...register('passwordConfirm')}
          />
          {errors.passwordConfirm && (
            <p className="text-sm text-red-600">{errors.passwordConfirm.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="agreedToTerms"
              checked={agreedToTerms}
              onCheckedChange={(checked) =>
                setValue('agreedToTerms', checked === true, {
                  shouldValidate: true,
                })
              }
              className="mt-0.5 border-neutral-300 data-[state=checked]:border-rose-500 data-[state=checked]:bg-rose-500"
            />
            <Label htmlFor="agreedToTerms" className="leading-5 text-neutral-700">
              서비스 이용 약관에 동의합니다. 수집 항목은 아이디와 비밀번호뿐입니다.
            </Label>
          </div>
          {errors.agreedToTerms && (
            <p className="text-sm text-red-600">{errors.agreedToTerms.message}</p>
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
          {isSubmitting ? '가입 중...' : '가입하기'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-neutral-500">
        이미 계정이 있나요?{' '}
        <Link href={loginHref} className="font-semibold text-rose-500 hover:underline">
          로그인
        </Link>
      </p>
    </AuthCard>
  );
}
