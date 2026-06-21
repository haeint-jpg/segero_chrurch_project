# 배포 가이드 — 다음세대비전교회 홈페이지

## 1단계 — GitHub에 올리기

```bash
# 프로젝트 폴더에서
git init
git add .
git commit -m "초기 세팅"

# GitHub에서 새 저장소 만들고:
git remote add origin https://github.com/내아이디/church-website.git
git push -u origin main
```

## 2단계 — Vercel 배포 (무료)

1. https://vercel.com 접속 → GitHub으로 로그인
2. "New Project" → 방금 만든 저장소 선택
3. "Deploy" 클릭 → 약 2분 후 완료
4. 자동 생성 주소 예: `https://church-website-xxx.vercel.app`

## 3단계 — 환경변수 설정 (Vercel 대시보드)

Vercel → 프로젝트 → Settings → Environment Variables 에서 추가:

| 변수명 | 값 |
|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Supabase 프로젝트 URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anon key |

## 4단계 — Supabase DB 세팅

https://supabase.com 에서 새 프로젝트 생성 후
SQL Editor에서 아래 실행:

```sql
create table posts (
  id         uuid default gen_random_uuid() primary key,
  category   text not null,
  title      text not null,
  content    text,
  image_url  text,
  source     text default 'admin',
  created_at timestamptz default now()
);

-- 공개 읽기 허용
alter table posts enable row level security;
create policy "누구나 읽기" on posts for select using (true);
create policy "서비스롤만 쓰기" on posts for insert with check (false);
```

## 5단계 — 도메인 연결 (선택)

Vercel → 프로젝트 → Settings → Domains → 도메인 입력
DNS에서 CNAME을 `cname.vercel-dns.com` 으로 설정

## 완료 후 할 일

- [ ] 교회 이름·주소·전화번호 실제 정보로 교체 (`components/Footer.tsx`)
- [ ] 담임목사 이름 교체 (`components/SermonSection.tsx`)
- [ ] 실제 설교 YouTube URL 연결
- [ ] 예배 시간 실제 정보로 교체
- [ ] 앱스토어 링크 연결 (`components/AppBanner.tsx`)
