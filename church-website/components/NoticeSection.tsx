import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const notices = [
  { tag: '새소식', tagStyle: 'bg-brand-50 text-brand-600', text: '2025 여름 어린이 성경학교 신청 안내', date: '06.18', href: '/notices/1' },
  { tag: '공지',   tagStyle: 'bg-teal-50 text-teal-600',   text: '6월 청년부 셀모임 일정 변경 안내', date: '06.15', href: '/notices/2' },
  { tag: '새소식', tagStyle: 'bg-brand-50 text-brand-600', text: '온라인 헌금 시스템 오픈 안내',        date: '06.10', href: '/notices/3' },
]

export default function NoticeSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-medium text-gray-900">공지사항</h2>
        <Link href="/notices" className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-600">
          전체 보기 <ChevronRight size={13} />
        </Link>
      </div>
      <div className="border border-gray-100 rounded-xl overflow-hidden">
        {notices.map((n, i) => (
          <Link
            key={i}
            href={n.href}
            className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <span className={`text-[10px] rounded-full px-2 py-0.5 shrink-0 ${n.tagStyle}`}>{n.tag}</span>
            <span className="flex-1 text-sm text-gray-800 truncate">{n.text}</span>
            <span className="text-xs text-gray-300 shrink-0">{n.date}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
