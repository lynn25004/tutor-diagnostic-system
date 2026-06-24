create table if not exists public.student_records (
  id text primary key,
  student_name text,
  grade_label text,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.official_question_bank (
  id text primary key,
  year integer,
  subject text,
  title text,
  source_url text,
  payload jsonb not null,
  approved_at timestamptz not null default now()
);

create table if not exists public.diagnostic_tests (
  id text primary key,
  code text not null unique,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.diagnostic_submissions (
  id text primary key,
  test_code text,
  payload jsonb not null,
  submitted_at timestamptz not null default now()
);

create index if not exists student_records_updated_at_idx
  on public.student_records (updated_at desc);

create index if not exists official_question_bank_approved_at_idx
  on public.official_question_bank (approved_at desc);

create index if not exists official_question_bank_subject_idx
  on public.official_question_bank (subject);

create index if not exists official_question_bank_year_idx
  on public.official_question_bank (year);

create index if not exists diagnostic_tests_code_idx
  on public.diagnostic_tests (code);

create index if not exists diagnostic_tests_updated_at_idx
  on public.diagnostic_tests (updated_at desc);

create index if not exists diagnostic_submissions_test_code_idx
  on public.diagnostic_submissions (test_code);

create index if not exists diagnostic_submissions_submitted_at_idx
  on public.diagnostic_submissions (submitted_at desc);
