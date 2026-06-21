'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    series: '2025 여름 설교 시리즈',
    title: '다음 세대를\n일으키시는 하나님',
    subtitle: '왜 다니엘이었을까?  왜 에스더였을까?  왜 요셉이었을까?',
    quote: '단 하나, 지금 이 세대를 하나님께 드리라!',
    accent: '#7F77DD',
  },
  {
    series: '주일 설교 · 6월 22일',
    title: '요셉처럼\n어둠 속에서 빛나라',
    subtitle: '창세기 39장을 통해 다음세대가 배워야 할 믿음의 자세',
    quote: '하나님이 요셉과 함께 하셨더라 (창 39:2)',
    accent: '#5DCAA5',
  },
  {
    series: '2025 여름 성경학교',
    title: '에스더처럼\n이때를 위함이라',
    subtitle: '7월 21–25일 · 어린이·청소년 전 부서 함께하는 여름 캠프',
    quote: '네가 왕후의 자리를 얻은 것이 이때를 위함이 아닌지 (에 4:14)',
    accent: '#EF9F27',
  },
]

export default function HeroSlider() {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCur(p => (p + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [])

  const s = slides[cur]

  return (
    <section className="relative h-[520px] md:h-[600px] overflow-hidden flex items-center">

      {/* 교회 사진 배경 */}
      <Image
        src="/church.jpg"
        alt="세계로교회 건물"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* 어두운 오버레이 — 왼쪽은 짙게, 오른쪽은 사진 보이게 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />

      {/* 콘텐츠 — 왼쪽 정렬 */}
      <div className="relative z-10 px-8 md:px-16 max-w-xl">
        <p
          key={cur + 's'}
          className="text-xs tracking-[0.2em] mb-4 animate-fadeInUp uppercase"
          style={{ color: s.accent }}
        >
          {s.series}
        </p>
        <h1
          key={cur + 't'}
          className="text-4xl md:text-5xl font-medium leading-tight mb-5 text-white animate-fadeInUp delay-100 whitespace-pre-line"
        >
          {s.title}
        </h1>
        <p
          key={cur + 'u'}
          className="text-sm md:text-base mb-5 text-white/70 leading-relaxed animate-fadeInUp delay-200"
        >
          {s.subtitle}
        </p>
        <div
          key={cur + 'q'}
          className="inline-block border rounded-xl px-5 py-3 mb-7 animate-fadeInUp delay-200"
          style={{ borderColor: `${s.accent}88`, background: `${s.accent}22` }}
        >
          <p className="text-sm italic text-white/80">"{s.quote}"</p>
        </div>
        <div className="flex gap-3 animate-fadeInUp delay-300">
          <Link
            href="/sermons"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-80"
            style={{ background: s.accent }}
          >
            <Play size={14} /> 설교 보기
          </Link>
          <Link
            href="/sermons"
            className="px-5 py-2.5 rounded-lg text-sm text-white/70 border border-white/20 hover:bg-white/10 transition-colors"
          >
            시리즈 전체 보기
          </Link>
        </div>
      </div>

      {/* 이전/다음 버튼 */}
      <button
        onClick={() => setCur(p => (p - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => setCur(p => (p + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="다음 슬라이드"
      >
        <ChevronRight size={18} />
      </button>

      {/* 슬라이드 도트 */}
      <div className="absolute bottom-6 left-8 md:left-16 flex gap-2">
        {slides.map((sl, i) => (
          <button
            key={i}
            onClick={() => setCur(i)}
            aria-label={`슬라이드 ${i + 1}`}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: cur === i ? 24 : 6,
              background: cur === i ? slides[cur].accent : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>

      {/* 우하단 — 교회 이름 워터마크 */}
      <div className="absolute bottom-6 right-6 text-right">
        <p className="text-xs text-white/40">세계로교회</p>
        <p className="text-[10px] text-white/25">Next Generation Vision Church</p>
      </div>
    </section>
  )
}
