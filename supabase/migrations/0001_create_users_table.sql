-- 아이디 계정은 public.users 에 두고, 비밀번호 해시는 auth.users 에만 저장합니다.
-- 이 파일은 여러 번 실행해도 같은 결과가 나도록 작성했습니다.

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DO $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.users (
    id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    username text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT users_username_format CHECK (username ~ '^[a-z0-9_]{4,20}$'),
    CONSTRAINT users_username_unique UNIQUE (username)
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
  WHEN OTHERS THEN
    RAISE EXCEPTION 'public.users 생성 실패: %', SQLERRM;
END $$;

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

DO $$
BEGIN
  ALTER TABLE public.users
    ADD CONSTRAINT users_username_format CHECK (username ~ '^[a-z0-9_]{4,20}$');
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
  WHEN OTHERS THEN
    RAISE EXCEPTION 'users_username_format 제약 추가 실패: %', SQLERRM;
END $$;

DROP TRIGGER IF EXISTS set_users_updated_at ON public.users;
CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "users can read their own profile" ON public.users;
CREATE POLICY "users can read their own profile"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

GRANT SELECT ON public.users TO authenticated;

CREATE OR REPLACE FUNCTION public.is_username_taken(p_username text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users
    WHERE username = lower(trim(p_username))
  );
$$;

REVOKE ALL ON FUNCTION public.is_username_taken(text) FROM public;
GRANT EXECUTE ON FUNCTION public.is_username_taken(text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.confirm_auth_user_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = auth, public
AS $$
BEGIN
  IF NEW.email_confirmed_at IS NULL THEN
    NEW.email_confirmed_at := now();
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_username text;
BEGIN
  next_username := lower(trim(coalesce(NEW.raw_user_meta_data->>'username', '')));

  IF next_username !~ '^[a-z0-9_]{4,20}$' THEN
    RAISE EXCEPTION 'invalid username';
  END IF;

  INSERT INTO public.users (id, username)
  VALUES (NEW.id, next_username)
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DO $$
BEGIN
  DROP TRIGGER IF EXISTS hobbyfind_confirm_email ON auth.users;
  CREATE TRIGGER hobbyfind_confirm_email
    BEFORE INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.confirm_auth_user_email();

  DROP TRIGGER IF EXISTS hobbyfind_on_auth_user_created ON auth.users;
  CREATE TRIGGER hobbyfind_on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'auth.users 트리거 설정 실패: %', SQLERRM;
END $$;
