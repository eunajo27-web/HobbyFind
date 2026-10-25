-- 회원별 취미 북마크. users, hobbies 가 먼저 있어야 합니다.

DO $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.bookmarks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES public.users (id) ON DELETE CASCADE,
    hobby_id text NOT NULL REFERENCES public.hobbies (id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT bookmarks_user_hobby_unique UNIQUE (user_id, hobby_id)
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
  WHEN OTHERS THEN
    RAISE EXCEPTION 'public.bookmarks 생성 실패: %', SQLERRM;
END $$;

ALTER TABLE public.bookmarks
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.bookmarks
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

DO $$
BEGIN
  ALTER TABLE public.bookmarks
    ADD CONSTRAINT bookmarks_user_hobby_unique UNIQUE (user_id, hobby_id);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
  WHEN duplicate_table THEN
    NULL;
  WHEN OTHERS THEN
    RAISE EXCEPTION 'bookmarks_user_hobby_unique 제약 추가 실패: %', SQLERRM;
END $$;

CREATE INDEX IF NOT EXISTS bookmarks_user_id_idx ON public.bookmarks (user_id);

DROP TRIGGER IF EXISTS set_bookmarks_updated_at ON public.bookmarks;
CREATE TRIGGER set_bookmarks_updated_at
  BEFORE UPDATE ON public.bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can read their own bookmarks" ON public.bookmarks;
CREATE POLICY "users can read their own bookmarks"
  ON public.bookmarks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users can insert their own bookmarks" ON public.bookmarks;
CREATE POLICY "users can insert their own bookmarks"
  ON public.bookmarks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "users can delete their own bookmarks" ON public.bookmarks;
CREATE POLICY "users can delete their own bookmarks"
  ON public.bookmarks
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

GRANT SELECT, INSERT, DELETE ON public.bookmarks TO authenticated;
