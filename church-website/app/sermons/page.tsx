'use client'
import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Sermon = {
  id: string
  title: string
  preacher: string
  scripture: string
  category: string
  youtube_url: string | null
  sermon_date: string
}

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('sermons')
      .select('*')
      .order('sermon_date', { ascending: false })
      .then(({ data }) => { setSermons(data ?? []); setLoading(false) })
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-xl font-medium text-gray-900 mb-6">설교</h1>

      {loading && <p className="text-sm text-gray-400">불러오는 중...</p>}

      {!loading && sermons.length === 0 && (
        <p className="text-sm text-gray-400">등록된 설교가 없습니다.</p>
      )}

      <div className="flex flex-col gap-3">
        {sermons.map(s => {
          const date = s.sermon_date
            ? `${s.sermon_date.slice(0, 4)}.${s.sermon_date.slice(5, 7)}.${s.sermon_date.slice(8, 10)}`
            : ''
          return (
            <div key={s.id} className="border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <Play size={16} className="text-brand-600 ml-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{s.title}</p>
                <p className="text-xs text-gray-400">{s.preacher} · {date} · {s.category}</p>
                {s.scripture && <p className="text-xs text-gray-400">{s.scripture}</p>}
              </div>
              {s.youtube_url && (
                <a
                  href={s.youtube_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs bg-red-50 text-red-600 rounded-lg px-3 py-1.5 hover:bg-red-100 transition-colors shrink-0"
                >
                  YouTube
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
