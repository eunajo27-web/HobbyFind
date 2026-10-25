'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import {
  AUTH_REQUIRED_MESSAGE,
  BOOKMARK_ERROR_MESSAGE,
} from '@/constants/messages';
import { useToast } from '@/hooks/use-toast';

type BookmarkResponse = {
  hobbyIds: string[];
};

async function requestBookmarks(hobbyId?: string) {
  const response = await fetch('/api/bookmarks', {
    method: hobbyId ? 'POST' : 'GET',
    headers: hobbyId ? { 'Content-Type': 'application/json' } : undefined,
    body: hobbyId ? JSON.stringify({ hobbyId }) : undefined,
  });
  const payload = (await response.json().catch(() => null)) as
    | (BookmarkResponse & { message?: string })
    | null;

  if (!response.ok) {
    throw new Error(payload?.message || BOOKMARK_ERROR_MESSAGE);
  }

  return payload?.hobbyIds ?? [];
}

/** 로그인 사용자의 북마크 목록을 조회하고 토글합니다. */
export function useBookmarks() {
  const { status } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const queryKey = ['bookmarks'] as const;

  const query = useQuery({
    queryKey,
    queryFn: () => requestBookmarks(),
    enabled: status === 'authenticated',
  });

  useEffect(() => {
    if (!query.error) {
      return;
    }

    toast({
      variant: 'destructive',
      description:
        query.error instanceof Error
          ? query.error.message
          : BOOKMARK_ERROR_MESSAGE,
    });
  }, [query.error, toast]);

  const mutation = useMutation({
    mutationFn: (hobbyId: string) => requestBookmarks(hobbyId),
    onMutate: async (hobbyId) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<string[]>(queryKey) ?? [];
      const next = previous.includes(hobbyId)
        ? previous.filter((id) => id !== hobbyId)
        : [...previous, hobbyId];

      queryClient.setQueryData<string[]>(queryKey, next);
      return { previous };
    },
    onError: (error, _hobbyId, context) => {
      queryClient.setQueryData(queryKey, context?.previous ?? []);
      toast({
        variant: 'destructive',
        description:
          error instanceof Error ? error.message : BOOKMARK_ERROR_MESSAGE,
      });
    },
    onSuccess: (hobbyIds) => {
      queryClient.setQueryData(queryKey, hobbyIds);
    },
  });

  const toggle = (hobbyId: string) => {
    if (status !== 'authenticated') {
      toast({ description: AUTH_REQUIRED_MESSAGE });
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    mutation.mutate(hobbyId);
  };

  return {
    hobbyIds: status === 'authenticated' ? (query.data ?? []) : [],
    isLoading: status === 'authenticated' && query.isLoading,
    isError: status === 'authenticated' && query.isError,
    pendingId: mutation.isPending ? mutation.variables : undefined,
    toggle,
  };
}
