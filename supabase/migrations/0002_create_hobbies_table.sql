-- 고정 취미 18종. 0001_create_users_table.sql 의 set_updated_at 함수를 사용합니다.

DO $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.hobbies (
    id text PRIMARY KEY,
    name text NOT NULL,
    category text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT hobbies_category_check CHECK (category IN ('sports', 'intelligence', 'art'))
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
  WHEN OTHERS THEN
    RAISE EXCEPTION 'public.hobbies 생성 실패: %', SQLERRM;
END $$;

ALTER TABLE public.hobbies
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.hobbies
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

DO $$
BEGIN
  ALTER TABLE public.hobbies
    ADD CONSTRAINT hobbies_category_check CHECK (category IN ('sports', 'intelligence', 'art'));
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
  WHEN OTHERS THEN
    RAISE EXCEPTION 'hobbies_category_check 제약 추가 실패: %', SQLERRM;
END $$;

INSERT INTO public.hobbies (id, name, category) VALUES
  ('jogging', '조깅/러닝', 'sports'),
  ('yoga', '요가', 'sports'),
  ('swimming', '수영', 'sports'),
  ('cycling', '자전거', 'sports'),
  ('climbing', '클라이밍', 'sports'),
  ('dance', '댄스', 'sports'),
  ('reading', '독서', 'intelligence'),
  ('puzzle', '퍼즐', 'intelligence'),
  ('chess', '체스', 'intelligence'),
  ('programming', '프로그래밍', 'intelligence'),
  ('language', '외국어 학습', 'intelligence'),
  ('photography', '사진 촬영', 'intelligence'),
  ('drawing', '그림 그리기', 'art'),
  ('instrument', '악기 연주', 'art'),
  ('cooking', '요리', 'art'),
  ('calligraphy', '서예', 'art'),
  ('pottery', '도자기 만들기', 'art'),
  ('gardening', '정원 가꾸기', 'art')
ON CONFLICT (id) DO NOTHING;

DROP TRIGGER IF EXISTS set_hobbies_updated_at ON public.hobbies;
CREATE TRIGGER set_hobbies_updated_at
  BEFORE UPDATE ON public.hobbies
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.hobbies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "hobbies are readable by everyone" ON public.hobbies;
CREATE POLICY "hobbies are readable by everyone"
  ON public.hobbies
  FOR SELECT
  TO anon, authenticated
  USING (true);

GRANT SELECT ON public.hobbies TO anon, authenticated;
