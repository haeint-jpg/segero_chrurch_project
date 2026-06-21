'use client'
import { useEffect, useState } from 'react'
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

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('notices')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setNotices(data ?? []); setLoading(false) })
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-xl font-medium text-gray-900 mb-6">공지사항</h1>

      {loading && <p className="text-sm text-gray-400">불러오는 중...</p>}

      {!loading && notices.length === 0 && (
        <p className="text-sm text-gray-400">등록된 공지사항이 없습니다.</p>
      )}

      <div className="border border-gray-100 rounded-xl overflow-hidden">
        {notices.map(n => (
          <div
            key={n.id}
            className="flex items-center gap-3 px-4 py-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <span className={`text-[10px] rounded-full px-2 py-0.5 shrink-0 ${TAG_STYLE[n.tag] ?? 'bg-gray-50 text-gray-500'}`}>
              {n.tag}
            </span>
            <span className="flex-1 text-sm text-gray-800">{n.text}</span>
            <span className="text-xs text-gray-300 shrink-0">
              {n.created_at.slice(0, 10).replace(/-/g, '.')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
