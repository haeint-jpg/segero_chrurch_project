'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Notice = {
  id: string
  tag: string
  text: string
  created_at: string
}

const TAG_STYLE: Record<string, string> = {
  '새소식': 'bg-brand-50 text-brand-600',
  '공지':   'bg-teal-50 text-teal-600',
  '긴급':   'bg-red-50 text-red-600',
}

export default function NoticeSection() {
  const [notices, setNotices] = useState<Notice[]>([])

  useEffect(() => {
    supabase
      .from('notices')
      .select('id, tag, text, created_at')
      .order('created_at', { ascending: false })
      .limit(4)
      .then(({ data }) => setNotices(data ?? []))
  }, [])

  if (notices.length === 0) return null

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-medium text-gray-900">공지사항</h2>
        <Link href="/notices" className="flex items-center gap-1 text-xs text-gray-400 hover:text-brand-600">
          전체 보기 <ChevronRight size={13} />
        </Link>
      </div>
      <div className="border border-gray-100 rounded-xl overflow-hidden">
        {notices.map(n => (
          <div
            key={n.id}
            className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-b-0"
          >
            <span className={`text-[10px] rounded-full px-2 py-0.5 shrink-0 ${TAG_STYLE[n.tag] ?? 'bg-gray-50 text-gray-500'}`}>
              {n.tag}
            </span>
            <span className="flex-1 text-sm text-gray-800 truncate">{n.text}</span>
            <span className="text-xs text-gray-300 shrink-0">
              {n.created_at.slice(5, 10).replace('-', '.')}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
