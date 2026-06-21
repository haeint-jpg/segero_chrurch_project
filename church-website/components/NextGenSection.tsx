'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Star, Zap, Flame, ChevronRight } from 'lucide-react'

const tabs = [
  {
    key: 'children',
    label: '어린이부',
    icon: Star,
    color: 'brand',
    items: [
      { title: '2025 여름 성경학교', sub: '7월 21–25일 · 신청 접수 중', badge: 'D-32', href: '/next-gen/children/camp' },
      { title: '주일 어린이 예배', sub: '매주 일요일 오전 11시', badge: '예배 안내', href: '/next-gen/children' },
      { title: '이번 주 어린이 설교', sub: '"다니엘처럼 용감하게!"', badge: '영상 보기', href: '/sermons?dept=children' },
    ],
    badgeStyle: 'bg-brand-50 text-brand-600',
  },
  {
    key: 'youth',
    label: '청소년부',
    icon: Zap,
    color: 'teal',
    items: [
      { title: '2025 청소년 수련회', sub: '8월 4–6일 · 신청 중', badge: 'D-46', href: '/next-gen/youth/camp' },
      { title: '주일 청소년 예배', sub: '매주 일요일 오후 2시', badge: '예배 안내', href: '/next-gen/youth' },
      { title: '이번 주 청소년 설교', sub: '"에스더처럼 이때를 위하여"', badge: '영상 보기', href: '/sermons?dept=youth' },
    ],
    badgeStyle: 'bg-teal-50 text-teal-600',
  },
  {
    key: 'young',
    label: '청년부',
    icon: Flame,
    color: 'amber',
    items: [
      { title: '6월 셀모임', sub: '매주 목요일 오후 7시 30분', badge: '신청하기', href: '/next-gen/young/cell' },
      { title: '주일 청년 예배', sub: '매주 일요일 오후 4시', badge: '예배 안내', href: '/next-gen/young' },
      { title: '이번 주 청년 설교', sub: '"요셉의 꿈, 나의 꿈"', badge: '영상 보기', href: '/sermons?dept=young' },
    ],
    badgeStyle: 'bg-amber-50 text-amber-600',
  },
]

export default function NextGenSection() {
  const [active, setActive] = useState('children')
  const tab = tabs.find(t => t.key === active)!

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-medium text-gray-900">다음세대</h2>
        <Link href="/next-gen" className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-600">
          전체 보기 <ChevronRight size={13} />
        </Link>
      </div>

      {/* 탭 */}
      <div className="flex border border-gray-100 rounded-lg overflow-hidden mb-3">
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-colors ${
                active === t.key
                  ? 'bg-brand-600 text-white'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              <Icon size={13} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* 항목 목록 */}
      <div className="flex flex-col gap-2">
        {tab.items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
              <p className="text-xs text-gray-400">{item.sub}</p>
            </div>
            <span className={`text-[10px] rounded-full px-2 py-0.5 shrink-0 ${tab.badgeStyle}`}>
              {item.badge}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
