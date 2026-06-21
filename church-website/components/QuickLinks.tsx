import Link from 'next/link'
import { Clock, FileText, Heart, CreditCard } from 'lucide-react'

const links = [
  { icon: Clock,      label: '예배 시간표', sub: '주일 오전 9 · 11시',   href: '/about' },
  { icon: FileText,   label: '이번 주 주보', sub: '2025년 6월 22일',      href: '/notices' },
  { icon: Heart,      label: '기도 요청',    sub: '함께 기도합니다',       href: '/notices' },
  { icon: CreditCard, label: '온라인 헌금',  sub: '카카오페이 · 토스',     href: '/offering' },
]

export default function QuickLinks() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-100">
      {links.map((l, i) => {
        const Icon = l.icon
        return (
          <Link
            key={i}
            href={l.href}
            className="flex flex-col items-center gap-2 py-5 px-3 border-r border-gray-100 last:border-r-0 hover:bg-brand-50 transition-colors group"
          >
            <Icon size={22} className="text-brand-600 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-gray-800">{l.label}</p>
            <p className="text-xs text-gray-400">{l.sub}</p>
          </Link>
        )
      })}
    </div>
  )
}
